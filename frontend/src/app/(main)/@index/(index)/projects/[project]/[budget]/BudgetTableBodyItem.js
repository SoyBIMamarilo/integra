"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import BudgetTableBodyItemSub from "./BudgetTableBodyItemSubItem";
import BudgetTableBodyItemManual from "./BudgetTableBodyItemManualItem";
import Trash from "@/components/svg/trash";
import { nf, nf_per } from "@/util/date-format";
import Arrow from "@/components/svg/arrow";
import Plus from "@/components/svg/plus";
import View from "@/components/svg/view";
import Pencil from "@/components/svg/pencil";

const BudgetTableBodyItem = ({
  paquete,
  itemValue,
  packageValue,
  manualValue,
}) => {
  const path = usePathname() + "/create-item";
  const packageValueAdj = packageValue ? packageValue : {};
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const deletePaqueteHandler = async () => {
    const res = await fetch("/api/budget-package", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuesto_id: paquete.presupuesto_id,
        paquete_trabajo_id: paquete.paquete_trabajo_id,
      }),
    });
    router.refresh();
  };

  return (
    <>
      <tr>
        <td
          colSpan={1}
          className="h-8 cursor-pointer border border-solid  	 border-neutral-200 hover:bg-neutral-50"
        >
          <div
            onClick={clickHandler}
            className="flex flex-row place-items-center pl-2"
          >
            <div className="grow ">{paquete.nombre}</div>
            <Arrow open={open} />
          </div>
        </td>
        <td />
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {packageValueAdj.indicador} m2
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {/* {nf.format(packageValueAdj.valor_interno_paquete)} */}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(packageValueAdj.vrtot)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(packageValueAdj.vrm2const)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(packageValueAdj.vrm2vend)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf_per.format(packageValueAdj.incidencia)}
        </td>
        <td>
          <Trash onClick={deletePaqueteHandler} />
        </td>
        <td>
          <Link
            href={{
              pathname: path,
              query: { paquete: paquete.paquete_trabajo_id },
            }}
          >
            <Plus />
          </Link>
        </td>
        {/* <td>
          <View />
        </td>
        <td>
          <Pencil />
        </td> */}
      </tr>
      {itemValue.map((item) => (
        <BudgetTableBodyItemSub key={item.da} item={item} open={open} />
      ))}
      {manualValue.map((item) => (
        <BudgetTableBodyItemManual
          key={item.paquete_trabajo_id}
          item={item}
          open={open}
        />
      ))}
    </>
  );
};

export default BudgetTableBodyItem;
