import Link from "next/link";
import ProjectList from "@/components/card/project-cards";

const ProjectSection = () => {
  return (
    <div className="basis-1/2">
      <div className="title-black">Proyectos</div>
      <ProjectList location={"projects"} />
      <div className="mt-4">
        <Link href="projects/create-project" className="button-black ">
          Crear Proyecto
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
