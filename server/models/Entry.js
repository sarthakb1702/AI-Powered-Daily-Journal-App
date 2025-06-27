import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    summary: String,
    mood: String
  },
  { timestamps: true }
);

export default mongoose.model("Entry", entrySchema);
