import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";
import ProjectInfoForm from "./ProjectInfoForm";

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

  return (
    <Modal>
      <div className="mb-4 font-bold">Parámetros Presupuesto</div>
      <ProjectInfoForm
        project={params.project}
        budget={params.budget}
        indices={indices}
        pendingIndices={pendingIndices}
      />
    </Modal>
  );
};

export default Page;
