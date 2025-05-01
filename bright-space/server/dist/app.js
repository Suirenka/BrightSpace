"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const challenges_1 = require("./challenges");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use(express_1.default.static("build"));
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2023-03-15-preview";
const systemPrompt = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "systemRole.md"), "utf-8");
const userPromptTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "prompt.md"), "utf-8");
app.get("/api/random-challenges", async (req, res) => {
    // random choose 5 challenges from the challenge data
    console.log("Received request for random challenges");
    const randomChallenges = challenges_1.challengeData
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    const challenges = randomChallenges.map((challenge) => {
        return {
            question: challenge.question,
            options: challenge.options,
            correctIndex: challenge.correctIndex,
            correctFeedback: {
                title: challenge.correctFeedback.title,
                message: challenge.correctFeedback.message,
            },
            incorrectFeedback: {
                title: challenge.incorrectFeedback.title,
                message: challenge.incorrectFeedback.message,
            },
        };
    });
    console.log("Challenges:", challenges);
    res.json(challenges);
});
// Intention Analysis API
app.get("/api/intention-analysis", async (req, res) => {
    console.log("Received request for intention analysis");
    const userInput = req.query.prompt;
    if (!userInput) {
        res.status(400).json({ error: "Please enter your posting content." });
        return;
    }
    const userPrompt = userPromptTemplate.replace("{{input}}", userInput);
    try {
        const url = `${azureEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
        const payload = {
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
        };
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey,
        };
        const response = await axios_1.default.post(url, payload, { headers });
        res.json(response.data.choices[0].message.content);
    }
    catch (error) {
        console.error("Error calling Azure OpenAI API:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing your request" });
    }
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "build", "index.html"));
});
