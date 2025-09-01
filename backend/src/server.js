import http from "http";
import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import projectSocketHandler from "./sockets/projectSocket.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/files", fileRoutes);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket handler
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);
  projectSocketHandler(io, socket);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
