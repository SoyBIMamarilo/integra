import GroupCard from "@/components/card/group-card";
import Link from "next/link";
import ProjectListCard from "./ProjectListCard";

const ProjectList = async ({ userId, projects }) => {
  return (
    <GroupCard title="Proyectos del usuario" styles="min-w-[30%]">
      {projects.map((project) => (
        <ProjectListCard key={project.id} project={project} />
      ))}
      <div className="my-5 ml-2 place-self-end">
        <Link href={`/user-admin/${userId}/create`} className="button-black">
          Agregar a proyecto
        </Link>
      </div>
    </GroupCard>
  );
};

export default ProjectList;
