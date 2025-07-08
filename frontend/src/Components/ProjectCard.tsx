import type { Project } from "../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="font-bold text-lg">{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}