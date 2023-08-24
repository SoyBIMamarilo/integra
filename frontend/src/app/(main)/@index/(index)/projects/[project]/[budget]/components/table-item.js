"use client";

import Link from "next/link";

export default function ({ path, paquete, item }) {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  let nf_per = new Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <tr className="text-xs">
        <td className="table-content indent-4">
          <div className="flex flex-row">
            <div className="font-light ">{item.descripcion}</div>
            <div>{item.pyrefnombre}</div>
          </div>
          <div>CBS: {item.cbs}</div>
        </td>
        <td />
        <td className="table-content text-center">${item.destvr}</td>
        <td className="table-content text-center">
          ${nf.format(item.vrm2cap)}
        </td>
        <td className="table-content text-center">${nf.format(item.vrtot)}</td>
        <td className="table-content text-center">
          ${nf.format(item.vrm2const)}
        </td>
        <td className="table-content text-center">
          ${nf.format(item.vrm2vend)}
        </td>
        <td className="table-content text-center">
          {nf_per.format(item.incidencia)}
        </td>
      </tr>
    </>
  );
}
