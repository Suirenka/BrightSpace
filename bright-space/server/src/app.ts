/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { challengeData } from "./challenges";
import multer from "multer";
import { AzureOpenAI } from "openai";
import { Readable } from "stream";
import { createReadStream } from "fs";

const upload = multer({ storage: multer.memoryStorage() });

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

const whisperEndpoint = process.env.WHISPER_ENDPOINT;
const whisperApiKey = process.env.WHISPER_API_KEY;
const whisperApiVersion = process.env.WHISPER_API_VERSION || "2024-06-01";
const whisperDeploymentName = process.env.WHISPER_DEPLOYMENT_NAME || "whisper";

const systemPrompt = fs.readFileSync(
  path.join(__dirname, "..", "systemRole.md"),
  "utf-8"
);
const userPromptTemplate = fs.readFileSync(
  path.join(__dirname, "..", "prompt.md"),
  "utf-8"
);

const rt_systemPrompt = fs.readFileSync(
  path.join(__dirname, "..", "rt_systemRole.md"),
  "utf-8"
);
const rt_moodAnalyze = fs.readFileSync(
  path.join(__dirname, "..", "rt_moodAnalyze.md"),
  "utf-8"
);

const rt_wordProcess = fs.readFileSync(
  path.join(__dirname, "..", "rt_wordProcess.md"),
  "utf-8"
);

function getClient(): AzureOpenAI {
  return new AzureOpenAI({
    endpoint: whisperEndpoint,
    apiKey: whisperApiKey,
    apiVersion: whisperApiVersion,
    deployment: whisperDeploymentName,
  });
}

// Random Challenge API
app.get(
  "/api/random-challenges",
  async (req: Request, res: Response): Promise<void> => {
    // console.log("Received request for random challenges");
    // random choose 5 challenges from the challenge data
    const randomIndices = new Set<number>();
    while (randomIndices.size < 5) {
      const randomIndex = Math.floor(Math.random() * challengeData.length);
      randomIndices.add(randomIndex);
    }
    const randomChallenges = Array.from(randomIndices).map(
      (index) => challengeData[index]
    );

    res.json(randomChallenges);
  }
);

const yearsHandler: RequestHandler<{}, any, any, { indicator?: string }> = async (req, res) => {
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
      .filter((y): y is number => y !== null);


    res.json(list);
  } catch (err) {
    console.error("❌ Failed to fetch filtered years:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/api/years", yearsHandler);


app.get("/api/3_2a/search", async (req: Request, res: Response) => {
  const query = (req.query.query as string)?.trim().toLowerCase();

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
  } catch (err) {
    console.error("❌ Failed to search 3_2a records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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

// Reflective Twin API
app.get(
  "/api/reflective-twin",
  async (req: Request, res: Response): Promise<void> => {
    // console.log("Received request for intention analysis");
    const userInput = req.query.prompt as string;
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
        "api-key": apiKey!,
      };

      const response = await axios.post(url, payload, { headers });
      const reflection = response.data.choices[0].message.content;
      const [, subclassEmotion, ] =
        reflection.split("-");

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
          "api-key": apiKey!,
        };

        const wp_response = await axios.post(url, payload, { headers });
        const final_response = reflection + "-" + wp_response.data.choices[0].message.content;
        res.json(final_response);
      } catch (error: any) {
        console.error("Error calling Azure OpenAI API:", error);
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
        
      } catch (error: any) {
        console.error("Error calling Azure OpenAI API:", error);
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
  }
);

app.post(
  "/api/speech-to-text",
  upload.single("audio"),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No audio file uploaded." });
      return;
    }
    
    try {
      const client = getClient();
      // Turn the in-memory buffer into a readable stream
      const tempFilePath = path.join(__dirname, "temp_audio_file.webm");
      fs.writeFileSync(tempFilePath, req.file.buffer);

      const audioStream = fs.createReadStream(tempFilePath);

      const result = await client.audio.transcriptions.create({
        model: "",
        file: createReadStream("./dist/temp_audio_file.webm"),
      });

      fs.unlinkSync(tempFilePath); // Clean up the temporary file

      res.json({ transcription: result.text });
    } catch (err: any) {
      console.error("❌ Error transcribing audio:", err);
      res.status(500).json({ error: "Error transcribing audio." });
    }
  }
);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
