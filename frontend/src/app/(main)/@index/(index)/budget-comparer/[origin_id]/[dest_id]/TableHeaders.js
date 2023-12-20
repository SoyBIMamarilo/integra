const TableHeaders = () => {
  return (
    <thead>
      <tr>
        <th colSpan={2} />
        <th colSpan={6} className="h-16 w-1/13 rounded-t-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle font-bold text-base ">Proyecto 1</th>
        <th />
        <th colSpan={6} className="h-16 w-1/13 rounded-t-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle font-bold text-base ">Proyecto 2</th>
      </tr>
      <tr>
        <th className="h-2 w-1/13 rounded-tl-xl rounded-tr-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle font-bold text-base ">
          Costo Directo
        </th>
        <th className="w-4"></th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          Area
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          Costo M2 Subcapitulo
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          Valor Total
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          Valor Total M2 Area Construida
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          Valor Total M2 Area Vendible
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold text-base">
          % Incidencia
        </th>
        <th className="w-min"></th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          Area
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          Costo M2 Subcapitulo
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          Valor Total
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          Valor Total M2 Area Construida
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          Valor Total M2 Area Vendible
        </th>
        <th className="h-2 w-1/13 border-2 border-integra-text bg-integra-background-dark p-2 align-middle font-bold text-base">
          % Incidencia
        </th>
      </tr>
    </thead >
  );
};

export default TableHeaders;
