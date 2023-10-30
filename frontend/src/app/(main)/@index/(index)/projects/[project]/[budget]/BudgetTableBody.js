import { nf, nf_per } from "@/util/date-format";
import BudgetTableBodyItem from "./BudgetTableBodyItem";
// import BudgetTableBodyItem from "./BudgetItemTest";

const BudgetTableBody = ({ budget, name }) => {
  const total = budget.reduce((accumulator, item) => {
    return accumulator + item.vrtot;
  }, 0);
  const totalConst = budget.reduce((accumulator, item) => {
    return accumulator + item.vrm2const;
  }, 0);
  const totalVend = budget.reduce((accumulator, item) => {
    return accumulator + item.vrm2vend;
  }, 0);
  const incidencia = budget.reduce((accumulator, item) => {
    return accumulator + item.incidencia;
  }, 0);

  const packages = [...new Set(budget.map((it) => it.paquete))];

  return (
    <>
      <tr>
        <td className="flex flex-row place-items-center px-2 font-bold">
          {name}
        </td>
      </tr>
      {packages.map((packageItem) => (
        <BudgetTableBodyItem
          key={packageItem}
          paquete={packageItem}
          packageValue={budget.filter((it) => it.paquete == packageItem)}
        />
      ))}
      <tr>
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2">Sub Total</div>
        </td>
        <td />
        <td className="table-content text-center">-</td>
        <td className="table-content text-center">-</td>
        <td className="table-content text-center">{nf.format(total)}</td>
        <td className="table-content text-center">{nf.format(totalConst)}</td>
        <td className="table-content text-center">{nf.format(totalVend)}</td>
        <td className="table-content text-center">
          {nf_per.format(incidencia)}
        </td>
      </tr>
    </>
  );
};

export default BudgetTableBody;
