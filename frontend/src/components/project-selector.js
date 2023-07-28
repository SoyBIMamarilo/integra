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
    <Listbox value={selectedProject} onChange={projectChangeHandler}>
      <Listbox.Button className="grow-0 text-left text-3xl font-semibold">
        {selectedProject.nombre}
      </Listbox.Button>
      <Listbox.Options>
        {projects.map((project) => (
          <Listbox.Option key={project.id} value={project}>
            {project.nombre}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
