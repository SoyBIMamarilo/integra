import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseOptions } from "@/util/supabase";
import { cookies } from "next/headers";

import Modal from "@/components/modal/create-modal";
import BatchForm from "./BatchForm";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: historicos, error: error } = await supabase.rpc(
    "get_ejecutados_historicos"
  );
  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Items de csv</div>
      <BatchForm projects={historicos} />
    </Modal>
  );
};

export default Page;
