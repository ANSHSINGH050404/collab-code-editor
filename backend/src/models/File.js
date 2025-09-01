import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  name: { type: String, required: true },
  content: { type: String, default: "" },
  versionHistory: [
    {
      content: String,
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ]
}, { timestamps: true });

export default mongoose.model("File", fileSchema);
