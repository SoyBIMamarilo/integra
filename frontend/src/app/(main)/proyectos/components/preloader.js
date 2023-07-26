"use client";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectActions } from "@/src/store/project-slice";

export default function Preloader({ projects }) {
  const dispatch = useDispatch();
  const projectsStore = useSelector((state) => state.projects.loadedProjects);
  console.log(projectsStore);
  const loaded = useRef(false);
  console.log(loaded);
  if (!loaded.current) {
    dispatch(projectActions.setProjects(projects));
    loaded.current = true;
    console.log(projectsStore);
  }
  return null;
}
