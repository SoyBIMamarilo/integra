import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";

import { supabaseOptions } from "@/util/supabase";
import ProjectsTable from "./ProjectsTable";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: historicos, error: error } = await supabase.rpc(
    "get_ejecutados_historicos"
  );

  console.log("HISTORICOS", historicos);

  return (
    <>
      <div className="title-black">Proyectos Históricos</div>
      <div className="mb-4 mt-4 w-1/2">
        <ProjectsTable projects={historicos} />
      </div>
      <Link href={`/past-projects/batch-items`}>
        <button className="button-black">Importar</button>
      </Link>
    </>
  );
}
