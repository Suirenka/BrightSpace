import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

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

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

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
