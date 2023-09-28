import Link from "next/link";
import TempTableHeaders from "./TempTableHeaders";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import TempTableItem from "./TempTableItem";

const TempTable = async ({ project, template }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: tempItems, error } = await supabase
    .from("temp")
    .select("*")
    .eq("plantilla_presupuesto_id", template);
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full 	table-auto ">
        <TempTableHeaders />
        <tbody>
          {tempItems.map((item) => (
            <TempTableItem tempRow={item} />
          ))}

          <tr>
            <td>
              <Link href={`/historic-items/${project}/${template}/create`}>
                <button className="button-black my-3">Añadir Item </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TempTable;
