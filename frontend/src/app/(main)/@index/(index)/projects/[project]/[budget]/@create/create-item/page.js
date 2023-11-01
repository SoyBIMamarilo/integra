import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Modal from "@/components/modal/create-modal";
import CreateItem from "./CreateItem";
import { supabaseOptions } from "@/util/supabase";

export default async function Create({ params, searchParams }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: ejecutados, error } = await supabase.rpc("ejecutados_valor");
  const paquete = searchParams.paquete;
  return (
    <>
      <Modal>
        <div className="mb-2 text-lg font-bold">Añadir Item</div>
        <CreateItem presupuestos={ejecutados} />
      </Modal>
    </>
  );
}
