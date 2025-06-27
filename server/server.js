import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

app.use("/api/entries", entryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
