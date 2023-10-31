import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { nf, nf_per } from "@/util/date-format";
import { supabaseOptions } from "@/util/supabase";

import DownloadFile from "./DownloadButton";
import BudgetTableHeaders from "./BudgetTableHeaders";
import BudgetTableBody from "./BudgetTableBody";

const BudgetTable = async ({ budget, project }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const { data: budgetTotal, error } = await supabase.rpc("valor_presupuesto", {
    presupuesto: budget,
  });

  const total = budgetTotal.reduce((accumulator, item) => {
    return accumulator + item.vrtot;
  }, 0);
  const totalConst = budgetTotal.reduce((accumulator, item) => {
    return accumulator + item.vrm2const;
  }, 0);
  const totalVend = budgetTotal.reduce((accumulator, item) => {
    return accumulator + item.vrm2vend;
  }, 0);
  const incidencia = budgetTotal.reduce((accumulator, item) => {
    return accumulator + item.incidencia;
  }, 0);
  const categorias = [...new Set(budgetTotal.map((it) => it.categoria))];
  console.log(categorias);

  return (
    <div className="mt-5 flex h-full flex-col justify-start rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full table-fixed	border-separate ">
        <BudgetTableHeaders />
        <tbody>
          <tr className="h-2 "></tr>
          {categorias.map((cat) => (
            <BudgetTableBody
              key={cat}
              name={cat}
              budget={budgetTotal.filter((it) => it.categoria == cat)}
            />
          ))}
          <tr className="h-2" />

          <tr className="font-bold">
            <td colSpan={1} className="table-content cursor-pointer">
              <div className="flex flex-row place-items-center px-2">Total</div>
            </td>
            <td />
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">{nf.format(total)}</td>
            <td className="table-content text-center">
              {nf.format(totalConst)}
            </td>
            <td className="table-content text-center">
              {nf.format(totalVend)}
            </td>
            <td className="table-content text-center">
              {nf_per.format(incidencia)}
            </td>
          </tr>
          {/* <tr>
            <td className="inline-flex">
              <Link href={`/projects/${project}/${budget}/create`}>
                <button className="button-black my-3 mb-2 mr-2 inline-flex items-center rounded-lg px-5 py-2.5 text-sm">
                  Añadir paquete{" "}
                </button>
              </Link>
              <Link
                target="_blank"
                href={`/projects/${project}/${budget}/comparer`}
              >
                <button className="button-black my-3 mb-2 mr-2 inline-flex items-center rounded-lg px-5 py-2.5 text-sm">
                  Comparador
                </button>
              </Link>
              <DownloadFile
                project={project}
                budget={budget}
                fileType="application/octet-stream"
                fileName={`${Date.now().toFixed()}_Project${project}_Pres${budget}.csv`}
              />
            </td>
          </tr> */}
        </tbody>
      </table>
      <div className="mt-4 flex flex-row gap-3">
        <Link href={`/projects/${project}/${budget}/create`}>
          <button className="rounded-lg border-2 border-solid	 border-integra-text bg-gray4 px-5 py-1 font-bold text-integra-text hover:bg-gray6">
            Añadir Paquete
          </button>
        </Link>
        <Link href={`/projects/${project}/${budget}/parameters`}>
          <button className="rounded-lg border-2 border-solid	 border-integra-text bg-gray4 px-5 py-1 font-bold text-integra-text hover:bg-gray6">
            Parámetros
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BudgetTable;
