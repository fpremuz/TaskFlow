import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import ProjectCard from "../Components/ProjectCard";
import api from "../api/axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get("/projects")
      .then((res) => {
        const projects = res.data;
        setProjects(projects);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 sm:px-10 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Projects</h1>      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}