"use client";

import Trash from "@/components/svg/trash";
import { deleteItem } from "@/app/actions/item-actions";
import { nf, nf_per } from "@/util/date-format";

const BudgetTableBodyItemSub = ({ item, open }) => {
  const openStyle = open ? "table-row" : "hidden";
  const itemDeleteHandler = async () => {
    await deleteItem(item.item_id);
  };
  return (
    <>
      <tr className={`${openStyle} text-xs font-light `}>
        <td className="table-content">
          <div className=" flex flex-row flex-wrap gap-2 pl-2">
            <div className="">{item.descripcion}</div>
            <div className="font-semibold">{item.pyrefnombre}</div>
          </div>
          <div className="pl-2">CBS: {item.cbs}</div>
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
};

export default BudgetTableBodyItemSub;
