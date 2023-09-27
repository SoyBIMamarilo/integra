"use client";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectActions } from "@/store/project-slice";

export default function Preloader({ projects, paquetes }) {
  const dispatch = useDispatch();
  const projectsStore = useSelector((state) => state.projects.loadedProjects);
  const loaded = useRef(false);
  if (!loaded.current) {
    dispatch(projectActions.setProjects(projects));
    dispatch(projectActions.setPaquetes(paquetes));
    loaded.current = true;
  }
  return null;
}
