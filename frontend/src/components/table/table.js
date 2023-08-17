import Link from "next/link";
import TableSection from "./table-section";

export default function ({ paquetes, path, budget }) {
  return (
    <div className="mt-5 flex justify-center text-xs">
      <table className=" table-auto">
        <thead>
          <tr>
            <th className="table-header w-[15rem]">Costo Directo</th>
            <th className="w-4"></th>
            <th className="table-header w-[7rem]">Area</th>
            <th className="table-header w-[7rem]">Costo M2 Subcapitulo</th>
            <th className="table-header w-[7rem]">Valor Total</th>
            <th className="table-header w-[7rem]">
              Valor Total M2 Area Const.
            </th>
            <th className="table-header w-[7rem]">
              Valor Total M2 Area Vendible
            </th>
            <th className="table-header w-[7rem]">% Incidencia</th>
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
}
