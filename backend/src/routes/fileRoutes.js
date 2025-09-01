import express from "express";
import { createFile, getFile, updateFile, getFileVersions } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFile);
router.get("/:id", protect, getFile);
router.put("/:id", protect, updateFile);
router.get("/:id/versions", protect, getFileVersions);

export default router;
