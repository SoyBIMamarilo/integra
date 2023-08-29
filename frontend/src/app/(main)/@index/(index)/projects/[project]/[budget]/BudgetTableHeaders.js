const BudgetTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="table-header w-[35%]">Costo Directo</th>
        <th className="w-4"></th>
        <th className="table-header w-[11%]">Area</th>
        <th className="table-header w-[11%]">Costo M2 Subcapitulo</th>
        <th className="table-header w-[11%]">Valor Total</th>
        <th className="table-header w-[11%]">Valor Total M2 Area Construida</th>
        <th className="table-header w-[11%]">Valor Total M2 Area Vendible</th>
        <th className="table-header w-[11%]">% Incidencia</th>
        <th className="w-4"></th>
        <th className="w-4"></th>
      </tr>
    </thead>
  );
};

export default BudgetTableHeaders;
