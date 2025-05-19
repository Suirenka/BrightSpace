"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const challenges_1 = require("./challenges");
const multer_1 = __importDefault(require("multer"));
const openai_1 = require("openai");
const fs_2 = require("fs");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const prisma = new client_1.PrismaClient();
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
const whisperEndpoint = process.env.WHISPER_ENDPOINT;
const whisperApiKey = process.env.WHISPER_API_KEY;
const whisperApiVersion = process.env.WHISPER_API_VERSION || "2024-06-01";
const whisperDeploymentName = process.env.WHISPER_DEPLOYMENT_NAME || "whisper";
const systemPrompt = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "systemRole.md"), "utf-8");
const userPromptTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "prompt.md"), "utf-8");
const rt_systemPrompt = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "rt_systemRole.md"), "utf-8");
const rt_moodAnalyze = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "rt_moodAnalyze.md"), "utf-8");
const rt_wordProcess = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "rt_wordProcess.md"), "utf-8");
function getClient() {
    return new openai_1.AzureOpenAI({
        endpoint: whisperEndpoint,
        apiKey: whisperApiKey,
        apiVersion: whisperApiVersion,
        deployment: whisperDeploymentName,
    });
}
// Random Challenge API
app.get("/api/random-challenges", async (req, res) => {
    // console.log("Received request for random challenges");
    // random choose 5 challenges from the challenge data
    const randomIndices = new Set();
    while (randomIndices.size < 5) {
        const randomIndex = Math.floor(Math.random() * challenges_1.challengeData.length);
        randomIndices.add(randomIndex);
    }
    const randomChallenges = Array.from(randomIndices).map((index) => challenges_1.challengeData[index]);
    res.json(randomChallenges);
});
const yearsHandler = async (req, res) => {
    const indicator = req.query.indicator ?? "3_1";
    try {
        const years = await prisma.record.groupBy({
            by: ["year"],
            where: { indicatorCode: indicator },
            _count: true,
            orderBy: { year: "asc" }
        });
        const list = years
            .map((y) => y.year)
            .filter((y) => y !== null);
        res.json(list);
    }
    catch (err) {
        console.error("❌ Failed to fetch filtered years:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
app.get("/api/years", yearsHandler);
app.get("/api/3_2a/search", async (req, res) => {
    const query = req.query.query?.trim().toLowerCase();
    if (!query) {
        res.status(400).json({ error: "Missing 'query' parameter." });
        return;
    }
    try {
        const isYear = /^\d{4}$/.test(query);
        const rows = await prisma.record.findMany({
            where: {
                indicatorCode: "3_2a",
                ...(isYear
                    ? { year: parseInt(query) }
                    : {
                        lgaDesc: {
                            contains: query,
                            mode: "insensitive",
                        },
                    }),
            },
            orderBy: { year: "asc" },
        });
        const result = rows.map((r) => ({
            year: r.year,
            group: r.lgaDesc,
            value: r.indicator !== null ? +(r.indicator * 100).toFixed(2) : null,
        }));
        res.json(result);
    }
    catch (err) {
        console.error("❌ Failed to search 3_2a records:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Intention Analysis API
app.get("/api/intention-analysis", async (req, res) => {
    // console.log("Received request for intention analysis");
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
// Reflective Twin API
app.get("/api/reflective-twin", async (req, res) => {
    // console.log("Received request for intention analysis");
    const userInput = req.query.prompt;
    if (!userInput) {
        res.status(400).json({ error: "Please enter your feelings." });
        return;
    }
    const userPrompt = rt_moodAnalyze.replace("{{input}}", userInput);
    try {
        const url = `${azureEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
        const payload = {
            messages: [
                { role: "system", content: rt_systemPrompt },
                { role: "user", content: userPrompt },
            ],
        };
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey,
        };
        const response = await axios_1.default.post(url, payload, { headers });
        const reflection = response.data.choices[0].message.content;
        const [, subclassEmotion,] = reflection.split("-");
        const input_Prompt = rt_wordProcess.replace("{{input}}", userInput);
        const wp_Prompt = input_Prompt.replace("{{emotion}}", subclassEmotion);
        try {
            const url = `${azureEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
            const payload = {
                messages: [
                    { role: "system", content: "You will process a paragraph according to a specified mood. Remove any words that do not match the given mood." },
                    { role: "user", content: wp_Prompt },
                ],
            };
            const headers = {
                "Content-Type": "application/json",
                "api-key": apiKey,
            };
            const wp_response = await axios_1.default.post(url, payload, { headers });
            const final_response = reflection + "-" + wp_response.data.choices[0].message.content;
            res.json(final_response);
        }
        catch (error) {
            console.error("Error calling Azure OpenAI API:", error);
            res
                .status(500)
                .json({ error: "An error occurred while processing your request" });
        }
    }
    catch (error) {
        console.error("Error calling Azure OpenAI API:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing your request" });
    }
});
app.post("/api/speech-to-text", upload.single("audio"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No audio file uploaded." });
        return;
    }
    try {
        const client = getClient();
        // Turn the in-memory buffer into a readable stream
        const tempFilePath = path_1.default.join(__dirname, "temp_audio_file.webm");
        fs_1.default.writeFileSync(tempFilePath, req.file.buffer);
        const audioStream = fs_1.default.createReadStream(tempFilePath);
        const result = await client.audio.transcriptions.create({
            model: "",
            file: (0, fs_2.createReadStream)("./dist/temp_audio_file.webm"),
        });
        fs_1.default.unlinkSync(tempFilePath); // Clean up the temporary file
        res.json({ transcription: result.text });
    }
    catch (err) {
        console.error("❌ Error transcribing audio:", err);
        res.status(500).json({ error: "Error transcribing audio." });
    }
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "build", "index.html"));
});
