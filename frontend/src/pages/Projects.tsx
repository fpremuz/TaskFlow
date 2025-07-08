import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import ProjectCard from "../Components/ProjectCard";
import api from "../api/axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get<Project[]>("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}