import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async () => {
    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects();
    } catch (err) {
      alert("Error creating project");
    }
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New project name"
      />
      <button onClick={createProject}>Create</button>

      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            {p.name}
            <button onClick={() => navigate(`/editor/${p._id}`)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
