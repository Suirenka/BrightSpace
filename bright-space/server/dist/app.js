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
app.get("/bs-resource", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "build", "index.html"));
});
app.get("/report", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "build", "index.html"));
});
app.get("/bs-posting-coach", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "build", "index.html"));
});
/* ---------- /api/years ---------- */
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
// /* ---------- /api/chart-data ---------- */
// const chartDataHandler: RequestHandler<
//   {},
//   any,
//   any,
//   { year: string; indicator?: string }
// > = async (req, res) => {
//   const year      = parseInt(req.query.year);
//   const indicator = req.query.indicator ?? "3_1";
//   if (isNaN(year)) {
//     res.status(400).json({ error: 'Query parameter "year" is required' });
//     return;
//   }
//   try {
//     const rows = await prisma.record.findMany({
//       where: { year, indicatorCode: indicator },
//       orderBy: { lgaKey: "asc" }
//     });
//     const data = rows.map(
//       (r: { lgaDesc: string; indicator: number | null }) => ({
//         lga:   r.lgaDesc,
//         value: r.indicator != null ? +(r.indicator * 100).toFixed(2) : null
//       })
//     );
//     res.json(data);
//     return;
//   } catch (err) {
//     console.error("Failed to fetch chart data:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// app.get("/api/chart-data", chartDataHandler);
/* ---------- /api/3_2a/search ---------- */
app.get("/api/3_2a/search", async (req, res) => {
    const query = req.query.query?.trim().toLowerCase();
    if (!query) {
        res.status(400).json({ error: "Missing 'query' parameter." });
        return;
    }
    try {
        const isYear = /^\d{4}$/.test(query); // 判断是否是年份
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
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "build", "index.html"));
});
