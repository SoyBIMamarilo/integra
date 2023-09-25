import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";
import BudgetForm from "./BudgetForm";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: budgets, error } = await supabase
    .from("presupuesto")
    .select("id, version")
    .eq("proyecto_id", params.project);

  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Paquete de Trabajo</div>
      <BudgetForm budget={params.budget} budgets={budgets} />
    </Modal>
  );
};

export default Page;
