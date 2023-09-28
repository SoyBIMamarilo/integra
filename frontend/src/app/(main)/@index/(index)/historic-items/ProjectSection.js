import Link from "next/link";
import ProjectList from "@/components/card/project-cards";

const ProjectSection = () => {
  return (
    <div className="basis-1/2">
      <div className="title-black">Proyectos</div>
      <ProjectList location={"historic-items"}/>
    </div>
  );
};

export default ProjectSection;