import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import ProjectSection from "./ProjectSection";
import CityGroup from "./CityGroup";
import { supabaseOptions } from "@/util/supabase";

const Projects = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: cities, error } = await supabase.rpc("ciudades_con_proyectos");
  return (
    <div className="flex  grow flex-col justify-stretch">
      {/* <ProjectSection /> */}
      <div className="mb-2 mt-1  flex-none text-2xl font-semibold">
        Proyectos
      </div>
      <CityGroup cities={cities} />
      <Link className="w-max" href="projects/create-project">
        <button className="rounded-lg border-2 border-solid border-integra-text bg-integra-primary px-5 py-2.5 font-bold text-integra-text hover:bg-integra-secondary">
          Crear Proyecto
        </button>
      </Link>
    </div>
  );
};

export default Projects;
