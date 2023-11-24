import Link from "next/link";
import ProjectSelectionList from "./ProjectSelectionList";

const ProjectSection = () => {
  return (
    <div className="inline">
      <div className="mb-2 mt-1 text-2xl font-semibold">Proyectos</div>
      <ProjectSelectionList />
      <div className="mt-2">
        <Link href="projects/create-project">
          <button className="rounded-lg border-2 border-solid border-integra-text bg-integra-primary px-5 py-2.5 font-bold text-integra-text hover:bg-integra-secondary">
            Crear Proyecto
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
