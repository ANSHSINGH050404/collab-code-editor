
import CodeEditor from "../components/Editor";
import Chat from "../components/Chat";

const EditorPage = ({ projectId, fileId, user }) => {
  return (
    <div style={{ display: "flex" }}>
      <CodeEditor projectId={projectId} fileId={fileId} user={user} />
      <Chat projectId={projectId} user={user} />
    </div>
  );
};

export default EditorPage;
