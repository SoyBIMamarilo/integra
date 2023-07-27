"use client";

import { useSelector } from "react-redux";
import { Listbox } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { projectActions } from "../store/project-slice";

export default function ProjectSelector() {
  const router = useRouter();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.loadedProjects);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  function projectChangeHandler(event) {
    console.log(event);
    dispatch(projectActions.setSelectedProject(event));
    router.replace(`/proyectos/${event.id}`);
    console.log(selectedProject);
  }
  return (
    <>
      <button value={selectedProject} className="peer focus-within:shadow-lg">
        {selectedProject.nombre}
      </button>
      <div className="invisible peer-focus:visible  ">List test</div>
    </>
    // <Listbox value={selectedProject} onChange={projectChangeHandler}>
    //   <Listbox.Button className="mb-2 text-3xl font-semibold">
    //     {selectedProject.nombre}
    //   </Listbox.Button>
    //   <Listbox.Options>
    //     {projects.map((project) => (
    //       <Listbox.Option key={project.id} value={project}>
    //         {project.nombre}
    //       </Listbox.Option>
    //     ))}
    //   </Listbox.Options>
    // </Listbox>
  );
}
