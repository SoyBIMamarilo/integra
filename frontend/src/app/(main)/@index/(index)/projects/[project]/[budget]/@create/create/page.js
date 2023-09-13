import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";
import PackageForm from "./PackageForm";
// import { createBudgetPackage } from "@/app/actions/budget-actions";
// import { fetchPaquetesTrabajo } from "@/app/actions/paquetes-actions";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: paquetes, error } = await supabase
    .from("paquete_trabajo")
    .select();

  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Paquete de Trabajo</div>
      <PackageForm budget={params.budget} paquetes={paquetes} />
    </Modal>
  );
};

export default Page;
