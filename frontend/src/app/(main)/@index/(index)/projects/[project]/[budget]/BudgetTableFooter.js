import { nf, nf_per } from "@/util/date-format";

const BudgetTableFooter = ({ total, totalConst, totalVend, incidencia }) => {
  return (
    <>
      <tr className="h-2" />

      <tr className="font-bold">
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2">Total</div>
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

export default BudgetTableFooter;
