"use client";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectActions } from "@/src/store/project-slice";

export default function Preloader({ projects, paquetes }) {
  const dispatch = useDispatch();
  const projectsStore = useSelector((state) => state.projects.loadedProjects);
  const loaded = useRef(false);
  if (!loaded.current) {
    dispatch(projectActions.setProjects(projects));
    dispatch(projectActions.setPaquetes(paquetes));
    loaded.current = true;
    console.log(projectsStore);
  }
  return null;
}