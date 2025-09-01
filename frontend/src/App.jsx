import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/editor/:id" element={user ? <EditorPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
