import Link from "next/link";
import TableSection from "./table-section";

const Table = ({ paquetes, path, budget }) => {
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 text-xs shadow-lg shadow-neutral-300">
      <table className="h-min	w-full 	table-auto ">
        <thead>
          <tr>
            <th className="table-header w-[35%]">Costo Directo</th>
            <th className="w-4"></th>
            <th className="table-header w-[10%]">Area</th>
            <th className="table-header w-[10%]">Costo M2 Subcapitulo</th>
            <th className="table-header w-[10%]">Valor Total</th>
            <th className="table-header w-[10%]">
              Valor Total M2 Area Construida
            </th>
            <th className="table-header w-[10%]">
              Valor Total M2 Area Vendible
            </th>
            <th className="table-header w-[10%]">% Incidencia</th>
            <th className="w-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-2"></tr>

          {paquetes.map((paquete) => (
            <TableSection path={path} budget={budget} paquete={paquete} />
          ))}

          {/* <hr className="my-2 border-2 border-solid" /> */}
          <tr>
            <td>
              <Link href={path + "/create"}>
                <button className="button-black my-3">Añadir paquete </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
