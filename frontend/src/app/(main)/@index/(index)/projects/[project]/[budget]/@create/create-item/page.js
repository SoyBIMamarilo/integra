import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Modal from "@/components/modal/create-modal";
import CreateItem from "./CreateItem";
import { supabaseOptions } from "@/util/supabase";

export default async function Create({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projectList, error: errorProjects } = await supabase.rpc(
    "unique_list",
    { filter_type: "proyecto" }
  );
  const { data: line_typesList, error: errorLines } = await supabase.rpc(
    "unique_list",
    { filter_type: "line_type" }
  );
  const { data: descriptionList, error: errorDescription } = await supabase.rpc(
    "unique_list",
    { filter_type: "descripcion" }
  );
  const { data: cbsList, error: errorCbs } = await supabase.rpc("unique_list", {
    filter_type: "cbs",
  });
  const get_values = (it) => it.unique_vals;
  return (
    <>
      <Modal>
        <div className="mb-2 text-lg font-bold">Añadir Item</div>
        <CreateItem
          filterLists={{
            line_typesList: line_typesList.map(get_values),
            descriptionList: descriptionList.map(get_values),
            cbsList: cbsList.map(get_values),
            projectList: projectList.map(get_values),
          }}
        />
      </Modal>
    </>
  );
}
