const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());  // Enable CORS for all origins
app.use(express.json());

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDRsEpCni8fkVehWecMMM36Xh9bj5TnWGY`;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(API_URL, {
      contents: [{ role: "user", parts: [{ text: message }] }]
    });

    // Log the full response to check its structure
    console.log("Response from Gemini:", response.data);

    // Extract the reply from the response (adjust as per actual response structure)
    const candidates = response.data?.candidates;
    const reply = candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      res.json({ reply });
    } else {
      res.json({ reply: "No meaningful response received from Gemini." });
    }
  } catch (err) {
    console.error("Error from Gemini API:", err.message);
    res.status(500).json({ error: "Failed to fetch from Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
