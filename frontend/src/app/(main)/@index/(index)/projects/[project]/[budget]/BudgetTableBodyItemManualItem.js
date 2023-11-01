"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Alert from "./AlertDialog";
import LoadingComponent from "@/components/loading";
import { nf, nf_per } from "@/util/date-format";

const BudgetTableBodyItemManual = ({ item, open }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openStyle = open ? "table-row" : "hidden";
  const itemDeleteHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/item-manual", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.id,
      }),
    });
    await router.refresh();
    setLoading(false);
  };
  return (
    <>
      <tr>{loading && <LoadingComponent />}</tr>
      <tr className={`${openStyle} `}>
        <td className="table-content indent-2 text-sm">
          <div className=" flex flex-row flex-wrap gap-2 pl-2">
            <div className="">{item.descripcion}</div>
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
          <Alert
            name={item.descripcion}
            value={nf.format(item.vrtot)}
            onConfirm={itemDeleteHandler}
          />
        </td>
      </tr>
    </>
  );
};

export default BudgetTableBodyItemManual;
