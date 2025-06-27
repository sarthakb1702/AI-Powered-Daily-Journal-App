import express from "express";
import Entry from "../models/Entry.js";
import pkg from "cohere-ai";
const { CohereClient } = pkg;


const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const router = express.Router();

// Mood detection using simple keyword-based rules
function detectMood(text) {
  const negative = ["sad", "tired", "stressed", "angry", "anxious", "depressed", "overwhelmed"];
  const positive = ["happy", "joy", "grateful", "excited", "motivated", "confident"];

  const lower = text.toLowerCase();

  const hasPositive = positive.some(word => lower.includes(word));
  const hasNegative = negative.some(word => lower.includes(word));

  if (hasPositive && !hasNegative) return "positive";
  if (hasNegative && !hasPositive) return "negative";
  return "neutral";
}

// POST /api/entries
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.length < 10) {
      return res.status(400).json({ message: "Content must be at least 10 characters." });
    }

    let summary = "Summary not generated (entry too short)";
    if (content.length >= 250) {
      const summaryRes = await cohere.summarize({ text: content });
      summary = summaryRes.summary;
    }

    const mood = detectMood(content);

    const newEntry = new Entry({
      content,
      summary,
      mood,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("❌ Error saving entry:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/entries
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
