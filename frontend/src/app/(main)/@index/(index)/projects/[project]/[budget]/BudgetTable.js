import BudgetTableHeaders from "./BudgetTableHeaders";
import BudgetTableBody from "./BudgetTableBody";
import BudgetTableFooter from "./BudgetTableFooter";

const BudgetTable = async ({ budget, project, budgetTotal }) => {
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

  const categorias = [
    ...new Set(
      budgetTotal
        .sort((a, b) => a.categoria_id - b.categoria_id)
        .map((it) => it.categoria),
    ),
  ];

  return (
    <table className="h-min table-fixed	border-separate ">
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
        <BudgetTableFooter
          total={total}
          totalConst={totalConst}
          totalVend={totalVend}
          incidencia={incidencia}
        />
      </tbody>
    </table>
  );
};

export default BudgetTable;
