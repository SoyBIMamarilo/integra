import Link from "next/link";

import { nf, nf_per } from "@/util/date-format";

import BudgetTableHeaders from "./BudgetTableHeaders";
import BudgetTableBody from "./BudgetTableBody";

const BudgetTable = ({
  packages,
  budget,
  project,
  itemsValues,
  packagesValues,
  budgetValues,
}) => {
  console.log("Budget Table");
  console.log(packagesValues);
  console.log(itemsValues);
  const totalValues = budgetValues.items[0] ? budgetValues.items[0] : {};
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full 	table-auto ">
        <BudgetTableHeaders />
        <tbody>
          <tr className="h-2"></tr>
          <BudgetTableBody
            packages={packages}
            itemsValues={itemsValues}
            packagesValues={packagesValues}
          />

          <tr className="text-xs">
            <td colSpan={1} className="table-content cursor-pointer">
              <div className="flex flex-row place-items-center px-2">Total</div>
            </td>
            <td />
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_total)}
            </td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_m2const)}
            </td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_m2vent)}
            </td>
            <td className="table-content text-center">
              {nf_per.format(totalValues.incidencia)}
            </td>
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
