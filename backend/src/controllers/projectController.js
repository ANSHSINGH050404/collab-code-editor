import Project from "../models/Project.js";
import File from "../models/File.js";

// Create new project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      owner: req.user._id,
      collaborators: [],
      files: []
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

// Get all projects of user (owned + collaborated)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { collaborators: req.user._id }]
    }).populate("owner", "username email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};

// Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "username email")
      .populate("collaborators", "username email")
      .populate("files");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err.message });
  }
};

// Add collaborator
export const addCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only project owner can add collaborators" });
    }

    if (!project.collaborators.includes(collaboratorId)) {
      project.collaborators.push(collaboratorId);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error adding collaborator", error: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only project owner can delete" });
    }

    await File.deleteMany({ projectId: project._id });
    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
};
