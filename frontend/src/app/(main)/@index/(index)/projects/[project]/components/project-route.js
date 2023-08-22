"use client";

import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";

import { projectActions } from "@/store/project-slice";

const ProjectRoute = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loadedProjects = useSelector((state) => state.projects.loadedProjects);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  console.log(loadedProjects);
  console.log(loadedProjects.filter((project) => project.id == params.project));
  const loaded = useRef(false);
  if (!loaded.current) {
    dispatch(
      projectActions.setSelectedProject(
        loadedProjects.filter((project) => project.id == params.project)[0]
      )
    );
    console.log(selectedProject);
  }

  return <div>Test</div>;
};

export default ProjectRoute;
