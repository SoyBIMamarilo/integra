import Link from "next/link";
import TempTableHeaders from "./TempTableHeaders";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import TempTableItem from "./TempTableItem";

const TempTable = async ({ project, template }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: tempItems, error } = await supabase
    .from("valor_presupuesto_v2")
    .select("*")
    .eq("plantilla_presupuesto_id", template);
  const COPcurrency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
  });

  console.log(error)

  // const {data: tData, error:error2} = await supabase.from("presupuesto_historico").select("sum(cantidad").eq("plantilla_presupuesto_id", template)

  // console.log(error2)

  var total = 0;
  return (
    <div className="relative mt-5 flex h-full flex-col justify-between overflow-x-scroll rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min w-full">
        <TempTableHeaders />
        <tbody>
          {tempItems.map((item) => (
            <TempTableItem tempRow={item} key={item.id} />
          ))}

        </tbody>
        <th colSpan={8} className="h-6"></th>
        <thead className="border border-solid">
          <tr>
            <th colSpan="5" className="border bg-black text-white">
              Total:
            </th>
            <th colSpan="2">{COPcurrency.format(total)}</th>
          </tr>
        </thead>
      </table>
      <nav
        class="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Se muestran{" "}
          <span class="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
          de{" "}
          <span class="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul class="inline-flex h-8 -space-x-px text-sm">
          <li>
            <a
              href="?p=1"
              class="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Anterior
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <div class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ">
              ....
            </div>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              class="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default TempTable;
