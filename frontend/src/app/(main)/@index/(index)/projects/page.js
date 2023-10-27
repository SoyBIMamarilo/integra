import ProjectSection from "./ProjectSection";
import IndexexSelection from "./IndexesSelection";
// import Summary from "./Summary";
const Projects = () => {
  return (
    <div className="flex grow flex-col justify-stretch">
      {/* <Summary /> */}
      <ProjectSection />
      <IndexexSelection />
    </div>
  );
};

export default Projects;
