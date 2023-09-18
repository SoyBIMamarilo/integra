"use client";

import { useRouter } from "next/navigation";

import Trash from "@/components/svg/trash";
import { nf, nf_per } from "@/util/date-format";

const BudgetTableBodyItemManual = ({ item, open }) => {
  const router = useRouter();
  const openStyle = open ? "table-row" : "hidden";
  const itemDeleteHandler = async () => {
    // console.log(item);
    const res = await fetch("http://localhost:3000/api/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.item_id,
      }),
    });
    router.refresh();
  };
  return (
    <>
      <tr className={`${openStyle} text-xs font-light `}>
        <td className="table-content">
          <div className=" flex flex-row flex-wrap gap-2 pl-2">
            <div className="">{item.nombre}</div>
          </div>
        </td>
        <td />
        <td className="table-content text-center">
          {/* {item.indicador_paquete} {item.ind_abrevietura} */}
        </td>
        <td className="table-content text-center">
          {/* ${nf.format(item.pond_interno)} /{item.ind_abrevietura} */}
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

export default BudgetTableBodyItemManual;
