import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import socket from "../utils/socket";

const CodeEditor = ({ projectId, fileId, user }) => {
  const editorRef = useRef(null);

  // Join project room
  useEffect(() => {
    socket.connect();
    socket.emit("joinProject", { projectId, userId: user._id });

    socket.on("codeUpdate", ({ fileId: fid, content }) => {
      if (fid === fileId && editorRef.current) {
        const currentValue = editorRef.current.getValue();
        if (currentValue !== content) {
          editorRef.current.setValue(content);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [projectId, fileId, user]);

  // Handle code change
  const handleChange = (value) => {
    socket.emit("codeChange", {
      projectId,
      fileId,
      content: value,
      userId: user._id,
    });
  };

  return (
    <Editor
      height="80vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      onMount={(editor) => (editorRef.current = editor)}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
