import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import LinkCard from "@/components/card/link-card";

const ProjectList = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projects, error } = await supabase.from("proyecto").select("*");
  // const projectsData = await fetch("http://localhost:3000/api/projects");
  // const projects = await projectsData.json();
  // console.log("projects", projects);
  return (
    <div className="flex w-2/3 flex-row flex-wrap gap-2">
      {projects.map((project) => (
        <LinkCard
          key={project.id}
          id={project.id}
          href={`/projects/${project.id}`}
          title={project.nombre}
          subtitle="ciudad"
        />
      ))}
    </div>
  );
};

export default ProjectList;
