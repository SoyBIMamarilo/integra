const TableHeaders = ({ project1, project2 }) => {
  return (
    <thead>
      <tr>
        <th colSpan={2} />
        <th
          colSpan={6}
          className="w-1/13 h-16 rounded-t-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle text-base font-bold "
        >
          {project1}
        </th>
        <th />
        <th
          colSpan={6}
          className="w-1/13 h-16 rounded-t-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle text-base font-bold "
        >
          {project2}
        </th>
      </tr>
      <tr>
        <th className="w-1/13 h-2 rounded-tl-xl rounded-tr-xl border-2 border-integra-text bg-integra-background-light p-2 align-middle text-base font-bold ">
          Costo Directo
        </th>
        <th className="w-4"></th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          Area
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          Costo M2 Subcapitulo
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          Valor Total
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          Valor Total M2 Area Construida
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          Valor Total M2 Area Vendible
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-primary p-2 align-middle text-base font-bold">
          % Incidencia
        </th>
        <th className="w-min"></th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          Area
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          Costo M2 Subcapitulo
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          Valor Total
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          Valor Total M2 Area Construida
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          Valor Total M2 Area Vendible
        </th>
        <th className="w-1/13 h-2 border-2 border-integra-text bg-integra-background-dark p-2 align-middle text-base font-bold">
          % Incidencia
        </th>
      </tr>
    </thead>
  );
};

export default TableHeaders;
