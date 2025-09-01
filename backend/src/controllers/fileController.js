import File from "../models/File.js";
import Project from "../models/Project.js";

// Create file inside project
export const createFile = async (req, res) => {
  try {
    const { projectId, name } = req.body;
    const file = await File.create({ projectId, name, content: "" });

    await Project.findByIdAndUpdate(projectId, { $push: { files: file._id } });

    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ message: "Error creating file", error: err.message });
  }
};

// Get file content
export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate("versionHistory.updatedBy", "username email");
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: "Error fetching file", error: err.message });
  }
};

// Update file content
export const updateFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    file.content = req.body.content;
    file.versionHistory.push({
      content: req.body.content,
      updatedBy: req.user._id
    });

    await file.save();
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: "Error updating file", error: err.message });
  }
};

// Get version history
export const getFileVersions = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate("versionHistory.updatedBy", "username email");
    if (!file) return res.status(404).json({ message: "File not found" });

    res.json(file.versionHistory);
  } catch (err) {
    res.status(500).json({ message: "Error fetching versions", error: err.message });
  }
};
