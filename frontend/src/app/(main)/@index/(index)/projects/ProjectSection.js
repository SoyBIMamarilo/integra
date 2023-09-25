import Link from "next/link";
import ProjectSelectionList from "./ProjectSelectionList";

const ProjectSection = () => {
  return (
    <div className="basis-1/2">
      <div className="title-black">Proyectos</div>
      <ProjectSelectionList />
      <div className="mt-4">
        <Link href="projects/create-project" className="button-black ">
          Crear Proyecto
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
