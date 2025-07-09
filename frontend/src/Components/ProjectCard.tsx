import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="text-sm text-gray-500">
        <p>Owner: <span className="font-medium">{project.owner?.username}</span></p>
        <p>Tasks: {project.tasks.length}</p>
      </div>
    </div>
  );
}