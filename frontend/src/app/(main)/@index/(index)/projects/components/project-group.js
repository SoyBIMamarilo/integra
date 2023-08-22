import LinkCard from "@/components/card/link-card";
import { fetchProjects } from "@/app/actions/project-actions";

const ProjectGroup = async () => {
  const projects = await fetchProjects();
  return (
    <div className="flex w-1/2 flex-row gap-2">
      {projects.map((project) => (
        <LinkCard
          key={project.id}
          id={project.id}
          href={`/projects/${project.id}`}
          title={project.nombre}
          subtitle="ciudad"
        />
      ))}
    </div>
  );
};

export default ProjectGroup;
