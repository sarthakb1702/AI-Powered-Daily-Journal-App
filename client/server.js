import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Basic home route to prevent 502 on Render
app.get("/", (req, res) => {
  res.send("✅ AI Journal API is running");
});

// ✅ Routes
app.use("/api/entries", entryRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  
  // Start the server after successful DB connection
  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB error:", err);
  process.exit(1);
});
