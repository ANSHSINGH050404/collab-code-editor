import File from "../models/File.js";

const projectSocketHandler = (io, socket) => {
  // Join project room
  socket.on("joinProject", ({ projectId, userId }) => {
    socket.join(`project_${projectId}`);
    console.log(`👤 User ${userId} joined project ${projectId}`);

    // Notify others
    socket.to(`project_${projectId}`).emit("userJoined", { userId });
  });

  // Handle live code changes
  socket.on("codeChange", async ({ projectId, fileId, content, userId }) => {
    // Broadcast change to others
    socket.to(`project_${projectId}`).emit("codeUpdate", { fileId, content, userId });

    // Save latest content in DB (debounced save in real apps)
    await File.findByIdAndUpdate(fileId, {
      content,
      $push: {
        versionHistory: {
          content,
          updatedBy: userId,
          updatedAt: new Date()
        }
      }
    });
  });

  // Handle cursor movement
  socket.on("cursorMove", ({ projectId, userId, cursorPos }) => {
    socket.to(`project_${projectId}`).emit("cursorUpdate", { userId, cursorPos });
  });

  // Handle chat messages
  socket.on("chatMessage", ({ projectId, userId, message }) => {
    const chat = { userId, message, timestamp: new Date() };
    io.to(`project_${projectId}`).emit("chatUpdate", chat);
  });
};

export default projectSocketHandler;
