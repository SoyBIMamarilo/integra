"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";

import { projectActions } from "@/src/store/project-slice";

export default function Preloader({ projects }) {
  const dispatch = useDispatch();
  const loaded = useRef(false);
  console.log(loaded);
  console.log(projects);
  if (!loaded.current) {
    dispatch(projectActions.setProjects(projects));
    loaded.current = true;
  }
  return null;
}
