import ProjectSection from "./ProjectSection";
import IndexexSelection from "./IndexesSelection";
const Projects = () => {
  console.log("PAGE MAIN");
  process.on("warning", (warning) => {
    console.log(warning.stack);
  });
  console.log("PAGE MAIN");
  return (
    <div className="flex grow flex-col justify-stretch">
      <ProjectSection />
      <IndexexSelection />
    </div>
  );
};

export default Projects;
