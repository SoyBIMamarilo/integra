import Link from "next/link";
import TempTableHeaders from "./TempTableHeaders";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import TempTableItem from "./TempTableItem";

const TempTable = async ({ project, template }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: tempItems, error } = await supabase
    .from("presupuesto_historico")
    .select("*")
    .eq("plantilla_presupuesto_id", template);
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300 relative overflow-x-scroll">
      <table className="h-min w-full">
        <TempTableHeaders />
        <tbody>
          {tempItems.map((item) => (
            <TempTableItem tempRow={item} key={item.id} />
          ))}
        </tbody>
        <thead className="border border-solid">
          <tr>
            <th colSpan="6" className="bg-black border text-white">Total:</th>
            <th colSpan = "2" >$2,400.00</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
export default TempTable;
