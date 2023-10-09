import Link from "next/link";
import ProjectSelectionList from "./ProjectSelectionList";

const ProjectSection = () => {
  return (
    <div className="basis-1/2">
      <div className="mb-2 mt-1 text-2xl font-semibold">Proyectos</div>
      <ProjectSelectionList />
      <div className="mt-4">
        <Link
          href="projects/create-project"
          className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-secondary px-5 py-2.5 font-bold text-integra-text hover:bg-integra-primary"
        >
          Crear Proyecto
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
