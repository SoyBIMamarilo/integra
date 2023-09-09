"use client";

import { useSelector } from "react-redux";
import { Listbox } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { projectActions } from "@/store/project-slice";

export default function ProjectSelector() {
  const router = useRouter();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.loadedProjects);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  function projectChangeHandler(event) {
    dispatch(projectActions.setSelectedProject(event));
    router.push(`/projects/${event.id}`);
  }

  return (
    <div className="relative">
      <Listbox value={selectedProject} onChange={projectChangeHandler}>
        <Listbox.Button className="title-black self-start ">
          {selectedProject.nombre}
        </Listbox.Button>
        <Listbox.Options className="ring-opacity-1 absolute z-10 mt-1 self-start rounded bg-white py-1 text-base shadow ring-1 ring-black focus:outline-none">
          {projects.map((project) => (
            <Listbox.Option
              className="relative cursor-pointer select-none px-5 py-1"
              key={project.id}
              value={project}
            >
              {project.nombre}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
