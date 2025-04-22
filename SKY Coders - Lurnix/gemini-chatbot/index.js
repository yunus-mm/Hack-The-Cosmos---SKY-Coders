import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

// Global conversation history
let conversationHistory = [];

// Create chat once and reuse it
let chat = model.startChat({
  history: conversationHistory,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Send message in context
    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    // Update conversation history manually
    conversationHistory.push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: response }] }
    );

    res.json({ reply: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Optional: Reset conversation history
app.post("/reset", (req, res) => {
  conversationHistory = [];
  chat = model.startChat({ history: conversationHistory });
  res.json({ message: "Conversation reset." });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
