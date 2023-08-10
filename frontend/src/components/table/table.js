import Link from "next/link";
import Plus from "../svg/plus";
import TableSection from "./table-section";

export default function ({ paquetes, path, budget }) {
  const headerStyle =
    "h-16 w-[7rem] border border-neutral-500 bg-neutral-50 p-2 align-middle";
  return (
    <div className="flex justify-center text-xs">
      <table className=" table-auto">
        <thead>
          <tr>
            <th className="h-16 w-48 border border-neutral-500	 bg-neutral-50 p-2 align-middle">
              Costo Directo
            </th>
            <th className="w-4"></th>
            <th className={headerStyle}>Area</th>
            <th className={headerStyle}>Costo M2 Subcapitulo</th>
            <th className={headerStyle}>Valor Total</th>
            <th className={headerStyle}>Valor Total M2 Area Const.</th>
            <th className={headerStyle}>Valor Total M2 Area Vendible</th>
            <th className={headerStyle}>% Incidencia</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-2"></tr>

          {paquetes.map((paquete) => (
            <TableSection path={path} budget={budget} paquete={paquete} />
          ))}

          <tr className="h-2" />

          <tr>
            <td>
              <Link href={path + "/create"}>
                <Plus />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
