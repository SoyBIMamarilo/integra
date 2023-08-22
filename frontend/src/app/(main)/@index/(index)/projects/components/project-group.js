"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { projectActions } from "@/store/project-slice";
import ButtonCard from "@/components/card/button-card";

const ProjectGroup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.loadedProjects);

  const projectRedirectHandler = (e) => {
    const id = e.currentTarget.id;
    // console.log(projects.filter((project) => project.id == id)[0]);
    // dispatch(
    //   projectActions.setSelectedProject(
    //     projects.filter((project) => project.id == id)[0]
    //   )
    // );
    router.push(`/projects/${id}`);
  };

  return (
    <div className="flex w-1/2 flex-row gap-2">
      {projects.map((project) => (
        <ButtonCard
          key={project.id}
          id={project.id}
          href={`/projects/${project.id}`}
          title={project.nombre}
          subtitle="ciudad"
          clickHandler={projectRedirectHandler}
        />
      ))}
    </div>
  );
};

export default ProjectGroup;
