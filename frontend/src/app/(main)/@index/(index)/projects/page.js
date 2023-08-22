import Preloader from "@/components/preloader";
import ReduxProvider from "@/components/provider";

import store from "@/store";
import ProjectGroup from "./components/project-group";
export default function Projects() {
  const projects = store.getState().projects.loadedProjects;
  console.log(projects);
  return (
    <>
      <div className="title-black">Proyectos</div>
      <ProjectGroup />
    </>
  );
}
