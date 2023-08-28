"use client";

import Trash from "@/components/svg/trash";
import { deleteItem } from "@/app/actions/item-actions";

export default function ({ item }) {
  console.log(item);
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  let nf_per = new Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const itemDeleteHandler = async () => {
    // console.log(item.item_id);
    await deleteItem(item.item_id);
  };
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
        <td className="table-content text-center">
          {item.indicador_paquete} {item.ind_abrevietura}
        </td>
        <td className="table-content text-center">
          ${nf.format(item.pond_interno)} /{item.ind_abrevietura}
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
        <td>
          <Trash onClick={itemDeleteHandler} />
        </td>
      </tr>
    </>
  );
}
