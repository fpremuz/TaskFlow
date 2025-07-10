import type { Project } from "../types/project";
import api from "../api/axios";

export default function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: () => void;
}) {
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

  return (
    <div className="bg-white shadow p-4 rounded relative">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-700">{project.description}</p>
      <p className="text-sm text-gray-500">Owner: {project.owner.username}</p>
      <p className="text-sm text-gray-500">Tasks: {project.tasks.length}</p>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>
    </div>
  );
}
