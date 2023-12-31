import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import LinkCard from "./link-card";

const ProjectList = async ({ location }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projects, error } = await supabase
    .from("proyecto")
    .select("*,ciudad(nombre)");
  console.log(projects);

  // const projectsData = await fetch("http://localhost:3000/api/projects");
  // const projects = await projectsData.json();
  // console.log("projects", projects);
  return (
    <div className="flex w-2/3 flex-row flex-wrap gap-2">
      {projects.map((project) => (
        <Link
          key={project.id}
          id={project.id}
          href={`/projects/${project.id}`}
          className=" w-[12rem] overflow-hidden	border-2 border-solid border-neutral-700 px-2 py-3 hover:bg-neutral-100"
        >
          <div className="truncate whitespace-nowrap">{project.nombre}</div>
          <div className="text-xs font-extralight">{project.ciudad.nombre}</div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
