import express from "express";
import cohere from "cohere-ai";
import Entry from "../models/entryModel.js";

const router = express.Router();

// ✅ Initialize Cohere
cohere.init(process.env.COHERE_API_KEY);

// ✅ POST route to create a new journal entry
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // 🤖 Use Cohere to generate a summary
    const cohereResponse = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: `Summarize this journal entry:\n\n"${content}"`,
      max_tokens: 100,
    });

    const summary = cohereResponse.body.generations[0].text.trim();

    // 🧠 Optional mood detection (basic keyword-based)
    let mood = "Neutral";
    if (content.toLowerCase().includes("happy") || content.toLowerCase().includes("excited")) {
      mood = "Positive";
    } else if (content.toLowerCase().includes("sad") || content.toLowerCase().includes("angry") || content.toLowerCase().includes("tired")) {
      mood = "Negative";
    }

    // 💾 Save to MongoDB
    const newEntry = new Entry({
      content,
      summary,
      mood,
    });

    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ error: "Failed to create entry" });
  }
});

// ✅ GET route to fetch all journal entries
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

export default router;
