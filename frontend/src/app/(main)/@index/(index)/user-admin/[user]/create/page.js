import Modal from "@/components/modal/create-modal";
import { supabaseOptions } from "@/util/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import AddProject from "./AddProject";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projects, error } = await supabase.from("proyecto").select("*");

  return (
    <Modal>
      <div className="mb-4 font-bold">Agregar usuario a proyecto</div>
      <AddProject projects={projects} user={params.user} />
    </Modal>
  );
}
