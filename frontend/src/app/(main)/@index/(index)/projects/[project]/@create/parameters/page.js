import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";
import ProjectInfoForm from "./ProjectInfoForm";
import ProjectBasicInfoForm from "./ProjectBasicInfoForm";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: indices, error } = await supabase.rpc("proyecto_indicadores", {
    proyecto: params.project,
  });
  const { data: pendingIndices, error: errorIndices } = await supabase.rpc(
    "indicadores_por_incluir",
    {
      proyecto: params.project,
    }
  );

  const { data: ciudades, errorCiudades } = await supabase
    .from("ciudad")
    .select();

  const { data: proyecto } = await supabase
    .from("proyecto")
    .select()
    .eq("id", params.project);

  const { data: ciudad } = await supabase
    .from("ciudad")
    .select()
    .eq("id", proyecto[0].ciudad_id);

  return (
    <Modal>
      <ProjectInfoForm
        project={proyecto[0]}
        ciudades={ciudades}
        ciudadProyecto={ciudad[0].nombre}
        indices={indices}
        pendingIndices={pendingIndices}
      />
    </Modal>
  );
};

export default Page;
