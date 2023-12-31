const BudgetTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="h-16 w-[25%] rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold ">
          Costo Directo
        </th>
        <th className="w-4"></th>
        <th className="h-16 w-[15%] border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Unidad Medida Paquete
        </th>
        <th className="h-16 w-[15%] border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Costo M2 Subcapitulo
        </th>
        <th className="h-16 w-[15%] border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Valor Total
        </th>
        <th className="h-16 w-[15%] border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Valor Total M2 Area Construida
        </th>
        <th className="h-16 w-[15%] border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Valor Total M2 Area Vendible
        </th>
        <th className="h-16 w-[15%] rounded-tr-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Incidencia
        </th>
        <th className="w-min"></th>
        <th className="w-min"></th>
      </tr>
    </thead>
  );
};

export default BudgetTableHeaders;
