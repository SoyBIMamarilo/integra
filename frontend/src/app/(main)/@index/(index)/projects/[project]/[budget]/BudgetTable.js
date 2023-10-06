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
    <div className="mt-5 flex h-full flex-col justify-start rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full table-fixed	border-separate ">
        <BudgetTableHeaders />
        <tbody>
          <tr className="h-2 "></tr>
          <BudgetTableBody budget={budget} />

          <tr className="h-2" />

          <tr className="font-bold">
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
        </tbody>
      </table>
      <Link href={`/projects/${project}/${budget}/create`}>
        <button className="m-2 rounded-lg border-2 border-solid	 border-white bg-black px-5 py-2.5 font-bold text-white hover:invert">
          Añadir Paquete
        </button>
      </Link>
    </div>
  );
};

export default BudgetTable;
