import { useState } from "react";
import api from "../api/axios";

export default function AddProjectForm({
  onProjectAdded,
}: {
  onProjectAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !description.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/projects", {
        name,
        description,
        ownerId: 1,
        deadline: new Date().toISOString(),
      });

      setName("");
      setDescription("");
      setSuccess("Project created successfully!");
      onProjectAdded();
    } catch (err) {
      console.error(err);
      setError("Failed to create project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Project Name</label>
        <input
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}