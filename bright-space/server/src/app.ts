import express, {
  Request,
  Response,
  RequestHandler
} from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();


dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static("build"));

const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2023-03-15-preview";

const systemPrompt = fs.readFileSync(
  path.join(__dirname, "..", "systemRole.md"),
  "utf-8"
);
const userPromptTemplate = fs.readFileSync(
  path.join(__dirname, "..", "prompt.md"),
  "utf-8"
);


app.get("/bs-resource", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

app.get("/report", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

app.get("/bs-posting-coach", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

/* ---------- /api/years ---------- */
const yearsHandler: RequestHandler = async (_, res) => {
  try {
    const years = await prisma.record.groupBy({
      by: ["year"],
      _count: true,
      orderBy: { year: "asc" }
    });

    const list = years
      .map((y: { year: number | null }) => y.year)
      .filter((y: number | null): y is number => y !== null);

    res.json(list);
  } catch (err) {
    console.error("Failed to fetch years:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/api/years", yearsHandler);

/* ---------- /api/chart-data ---------- */
const chartDataHandler: RequestHandler<
  {},
  any,
  any,
  { year: string; indicator?: string }
> = async (req, res) => {
  const year      = parseInt(req.query.year);
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

    const data = rows.map(
      (r: { lgaDesc: string; indicator: number | null }) => ({
        lga:   r.lgaDesc,
        value: r.indicator != null ? +(r.indicator * 100).toFixed(2) : null
      })
    );

    res.json(data);
    return;
  } catch (err) {
    console.error("Failed to fetch chart data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/api/chart-data", chartDataHandler);


// Intention Analysis API
app.get(
  "/api/intention-analysis",
  async (req: Request, res: Response): Promise<void> => {
    // console.log("Received request for intention analysis");
    const userInput = req.query.prompt as string;
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
        "api-key": apiKey!,
      };

      const response = await axios.post(url, payload, { headers });

      res.json(response.data.choices[0].message.content);
    } catch (error: any) {
      console.error("Error calling Azure OpenAI API:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  }
);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

