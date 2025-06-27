import express from "express";
import cohere from "cohere-ai";
import Entry from "../models/Entry.js";

const router = express.Router();

cohere.init(process.env.COHERE_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: `Summarize this journal entry:\n\n"${content}"`,
      max_tokens: 100,
    });

    const summary = response.body.generations[0].text.trim();

    let mood = "Neutral";
    if (content.toLowerCase().includes("happy")) mood = "Positive";
    else if (content.toLowerCase().includes("sad") || content.toLowerCase().includes("tired")) mood = "Negative";

    const newEntry = new Entry({ content, summary, mood });
    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

export default router;
