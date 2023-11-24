import ProjectSection from "./ProjectSection";
import CityGroup from "./CityGroup";
const Projects = () => {
  return (
    <div className="flex grow flex-col justify-stretch">
      <ProjectSection />
      <CityGroup />
    </div>
  );
};

export default Projects;
