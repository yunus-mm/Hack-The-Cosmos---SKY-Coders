const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

// ✅ Use your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyDJZ7fl73iREXoidM-c8CjegeZSEg0EGJw";

// ✅ Initialize Gemini SDK
const googleAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ✅ Define model config
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-pro", // this is a valid model name as of 2024/2025
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  },
});

// ✅ Endpoint to process AI request
app.post("/api/voice", async (req, res) => {
  const {text} = req.body

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text }] }],
    });

    const responseText = result.response.text();
    console.log(responseText);

    res.json({ response: responseText });

  } catch (error) {
    console.error("Error communicating with Gemini API:", error.message);
    res.status(500).json({ error: "Error processing your request with Gemini AI" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
