import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
