import Link from "next/link";
import TableSection from "./table-section";

const Table = ({
  paquetes,
  path,
  budget,
  items,
  packageItems,
  budgetValues,
}) => {
  const totalValues = budgetValues.items[0] ? budgetValues.items[0] : {};
  return (
    <div className="mt-5 flex h-full justify-center rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full 	table-auto ">
        <thead>
          <tr>
            <th className="table-header w-[35%]">Costo Directo</th>
            <th className="w-4"></th>
            <th className="table-header w-[11%]">Area</th>
            <th className="table-header w-[11%]">Costo M2 Subcapitulo</th>
            <th className="table-header w-[11%]">Valor Total</th>
            <th className="table-header w-[11%]">
              Valor Total M2 Area Construida
            </th>
            <th className="table-header w-[11%]">
              Valor Total M2 Area Vendible
            </th>
            <th className="table-header w-[11%]">% Incidencia</th>
            <th className="w-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-2"></tr>

          {paquetes.map((paquete) => (
            <TableSection
              path={path}
              budget={budget}
              paquete={paquete}
              items={items.items.filter(
                (it) => it.pqid == paquete.paquete_trabajo_id
              )}
              packageItem={
                packageItems.items.filter(
                  (it) => it.pqid == paquete.paquete_trabajo_id
                )[0]
              }
            />
          ))}
          <tr className="text-xs">
            <td colSpan={1} className="table-content cursor-pointer">
              <div className="flex flex-row place-items-center px-2">Total</div>
            </td>
            <td />
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">-</td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_total)}
            </td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_m2const)}
            </td>
            <td className="table-content text-center">
              {nf.format(totalValues.valor_m2vent)}
            </td>
            <td className="table-content text-center">
              {nf_per.format(totalValues.incidencia)}
            </td>
          </tr>
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
