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

  return (
    <>
      <div className="mb-2 mt-1 text-2xl font-semibold">
        Proyectos Históricos
      </div>
      <div className="mb-4 mt-4 w-1/2">
        <ProjectsTable projects={historicos} />
      </div>
      <Link href={`/past-projects/batch-items`}>
        <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-2.5 font-bold text-integra-text hover:bg-integra-background-strong">
          Importar
        </button>
      </Link>
    </>
  );
}
