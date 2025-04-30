"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const systemPrompt = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "systemRole.md"), "utf-8");
const userPromptTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "prompt.md"), "utf-8");
// Intention Analysis API
app.get("/api/intention-analysis", async (req, res) => {
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
/* ---------- /api/years ---------- */
const yearsHandler = async (_, res) => {
    try {
        const years = await prisma.record.groupBy({
            by: ["year"],
            _count: true,
            orderBy: { year: "asc" }
        });
        const list = years
            .map((y) => y.year)
            .filter((y) => y !== null);
        res.json(list);
    }
    catch (err) {
        console.error("Failed to fetch years:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
app.get("/api/years", yearsHandler);
/* ---------- /api/chart-data ---------- */
const chartDataHandler = async (req, res) => {
    const year = parseInt(req.query.year);
    const indicator = req.query.indicator ?? "3_1";
    if (isNaN(year)) {
        res.status(400).json({ error: 'Query parameter "year" is required' });
        return;
    }
    try {
        const rows = await prisma.record.findMany({
            where: { year, indicatorCode: indicator },
            orderBy: { lgaKey: "asc" }
        });
        const data = rows.map((r) => ({
            lga: r.lgaDesc,
            value: r.indicator != null ? +(r.indicator * 100).toFixed(2) : null
        }));
        res.json(data);
        return;
    }
    catch (err) {
        console.error("Failed to fetch chart data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
app.get("/api/chart-data", chartDataHandler);
app.get("/api/chart-data", chartDataHandler);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "build", "index.html"));
});
