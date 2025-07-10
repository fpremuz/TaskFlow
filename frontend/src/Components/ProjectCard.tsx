import { useState } from "react";
import type { Project } from "../types/project";
import api from "../api/axios";

type Props = {
  project: Project;
  onDelete: () => void;
  onUpdate: () => void;
};

export default function ProjectCard({ project, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [editedDescription, setEditedDescription] = useState(project.description ?? "");

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${project.id}`);
      onDelete();
    } catch (err) {
      alert("Failed to delete project.");
      console.error(err);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${project.id}`, {
        name: editedName,
        description: editedDescription,
      });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      alert("Failed to update project.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded relative">
      {!isEditing ? (
        <>
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <p className="text-gray-700">{project.description}</p>
          <p className="text-sm text-gray-500">Owner: {project.owner.username}</p>
          <p className="text-sm text-gray-500">Tasks: {project.tasks.length}</p>

          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-600 hover:text-yellow-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}