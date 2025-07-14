import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import ProjectCard from "../Components/ProjectCard";
import AddProjectForm from "../Components/AddProjectForm";
import api from "../api/axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get<Project[]>("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <div className="w-full max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Projects
        </h1>

        <AddProjectForm onProjectAdded={fetchProjects} />

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={fetchProjects}
                onUpdate={fetchProjects}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}