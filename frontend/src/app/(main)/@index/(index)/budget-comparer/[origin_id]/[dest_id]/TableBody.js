import { nf, nf_per } from "@/util/date-format";

import TableBodyItem from "./TableBodyItem";

const TableBody = ({ table, name }) => {
  const vp1_total = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrtot;
  }, 0);
  const vp1_vend = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrm2vend;
  }, 0);
  const vp1_const = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrm2const;
  }, 0);
  const vp1_incidencia = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_incidencia;
  }, 0);
  const vp2_total = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrtot;
  }, 0);
  const vp2_vend = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrm2vend;
  }, 0);
  const vp2_const = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrm2const;
  }, 0);
  const vp2_incidencia = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_incidencia;
  }, 0);
  const packages = [
    ...new Set(
      table
        .sort((a, b) => a.paquete_orden - b.paquete_orden)
        .map((it) => it.paquete_nombre)
    ),
  ];
  return (
    <>
      <tr>
        <td className="mt-3 flex flex-row place-items-center px-2 font-bold">
          {name}
        </td>
      </tr>
      {packages.map((packageItem) => (
        <TableBodyItem
          key={packageItem}
          packageValue={table.filter((it) => it.paquete_nombre == packageItem)}
        />
      ))}
      <tr className="h-2" />
      <tr className="font-bold">
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2">Subtotal</div>
        </td>
        <td />
        <td className="table-content text-center"></td>
        <td className="table-content text-center"></td>
        <td className="table-content text-center"></td>
        <td className="table-content text-center">{nf.format(vp1_total)}</td>
        <td className="table-content text-center">{nf.format(vp1_const)}</td>
        <td className="table-content text-center">{nf.format(vp1_vend)}</td>
        <td className="table-content text-center">
          {nf_per.format(vp1_incidencia)}
        </td>
        <td className="table-content text-center"></td>
        <td className="table-content text-center"></td>
        <td className="table-content text-center"></td>
        <td className="table-content text-center">{nf.format(vp2_total)}</td>
        <td className="table-content text-center">{nf.format(vp2_const)}</td>
        <td className="table-content text-center">{nf.format(vp2_vend)}</td>
        <td className="table-content text-center">
          {nf_per.format(vp2_incidencia)}
        </td>
      </tr>
    </>
  );
};

export default TableBody;
