import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Modal from "@/components/modal/create-modal";
import CreateProjectForm from "./CreateProjectForm";

const Create = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: indicadores, errorIndicadores } = await supabase
    .from("indicador")
    .select("*");
  const { data: ciudades, errorCiudades } = await supabase
    .from("ciudad")
    .select("*");

  return (
    <Modal>
      <div className="mb-4 font-bold">Crear Proyecto</div>
      <CreateProjectForm ciudades={ciudades} indicadores={indicadores} />
    </Modal>
  );
};

export default Create;
