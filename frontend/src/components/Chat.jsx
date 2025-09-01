import React, { useState, useEffect } from "react";
import socket from "../utils/socket";

const Chat = ({ projectId, user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chatUpdate", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("chatUpdate");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chatMessage", {
        projectId,
        userId: user._id,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div style={{ borderLeft: "1px solid gray", padding: "10px", width: "250px" }}>
      <h3>Chat</h3>
      <div style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.userId}</b>: {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
