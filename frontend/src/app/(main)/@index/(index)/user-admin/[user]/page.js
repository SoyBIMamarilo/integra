import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import ProjectList from "./ProjectList";
import GroupCard from "@/components/card/group-card";
import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projects, error } = await supabase
    .from("usuario_proyecto")
    .select("*,proyecto(nombre)")
    .eq("user_id", params.user);

  console.log(projects);
  return (
    <>
      <div className=" flex grow flex-row">
        <ProjectList projects={projects} userId={params.user} />
      </div>
    </>
  );
}
