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

const scenariosData = [
  {
    title: "Question 1: When Targeted",
    question:
      "You post a photo. Someone comments: “No one asked” and others like it. What do you do?",
    options: [
      "Delete the post immediately and say nothing",
      "Screenshot it, report the comment, and block the person",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Saving the proof and reporting it protects you — and blocking keeps your space safe.\n\n🟣You don’t have to respond to stay strong.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Deleting the post might seem easiest, but that lets the harm slide.\nTake control by reporting and blocking — you deserve a safe space.",
    },
  },
  {
    title: "Scenario 2: When Targeted",
    question:
      "You get a DM saying, “You should just quit trying.” It feels aggressive and personal.\nWhat do you do?",
    options: [
      "Respond with “lol ok” to make it seem like you don’t care",
      "Don’t reply, block the sender, and tell someone you trust",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "You don’t owe anyone a response. Blocking + talking to someone builds real support.\n\n🟣Protecting your peace is strength.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Trying to play it cool can leave the door open for more.\nInstead, take action — and get support.",
    },
  },
  {
    title: "Scenario 3: When Targeted",
    question:
      "You’ve been left out of a class group chat. When you ask about it, someone says “It’s not for everyone.”\nWhat do you do?",
    options: [
      "Pretend it doesn’t bother you and try harder to fit in",
      "Talk to a teacher or counselor about what’s happening",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Exclusion can be a form of bullying. It’s okay to speak up about how it’s affecting you.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Trying to force yourself in doesn’t solve it.\nYou deserve to be included — asking for help is a strong move.",
    },
  },
];

app.get(
  "/api/daily-quiz",
  async (req: Request, res: Response): Promise<void> => {
    res.json(scenariosData);
  }
);

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
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
