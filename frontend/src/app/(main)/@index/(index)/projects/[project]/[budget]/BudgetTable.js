import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

import { nf, nf_per } from "@/util/date-format";

import BudgetTableHeaders from "./BudgetTableHeaders";
import BudgetTableBody from "./BudgetTableBody";

const BudgetTable = async ({ budget, project }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: valorTotal, errorValorTotal } = await supabase.rpc(
    "presupuesto_total_valor",
    {
      presupuesto: budget,
    }
  );
  const { data: valorMetroConst, errorValorMetroConst } = await supabase.rpc(
    "presupuesto_valor_m2const",
    {
      presupuesto: budget,
    }
  );
  const { data: valorMetroVend, errorValorMetroVend } = await supabase.rpc(
    "presupuesto_valor_m2vend",
    {
      presupuesto: budget,
    }
  );
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full 	table-auto ">
        <BudgetTableHeaders />
        <tbody>
          <tr className="h-2 "></tr>
          <BudgetTableBody budget={budget} />

          <tr className="h-2" />

          <tr className="text-xs font-bold">
            <td colSpan={1} className="table-content cursor-pointer">
              <div className="flex flex-row place-items-center px-2">Total</div>
            </td>
            <td />
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">
              {valorTotal ? nf.format(valorTotal) : 0}
            </td>
            <td className="table-content text-center">
              {valorMetroConst ? nf.format(valorMetroConst) : 0}
            </td>
            <td className="table-content text-center">
              {valorMetroVend ? nf.format(valorMetroVend) : 0}
            </td>
            <td className="table-content text-center">{nf_per.format(1)}</td>
          </tr>
          <tr>
            <td>
              <Link href={`/projects/${project}/${budget}/create`}>
                <button className="button-black my-3">Añadir paquete </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
