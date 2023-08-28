"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { deletePresupuestoPaquete } from "@/app/actions/budget-actions";
import BudgetTableBodyItemSub from "./BudgetTableBodyItemSubItem";
import Trash from "@/components/svg/trash";
import { nf, nf_per } from "@/util/date-format";

const BudgetTableBodyItem = ({
  paquete,
  items,
  packageItem: paqueteValues,
}) => {
  console.log("BUDGET TABLE BODY");
  console.log(paqueteValues);
  const path = usePathname() + "/create-item";
  const itemValues = paqueteValues ? paqueteValues : {};
  console.log(itemValues);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const deletePaqueteHandler = async () => {
    await deletePresupuestoPaquete(
      paquete.presupuesto_id,
      paquete.paquete_trabajo_id
    );
    router.refresh();
  };

  return (
    <>
      <tr className="text-xs">
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2">
            <div onClick={clickHandler} className="grow ">
              {paquete.nombre}
            </div>
          </div>
        </td>
        <td />
        <td className="table-content text-center">{itemValues.indicador} m2</td>
        <td className="table-content text-center">
          {nf.format(itemValues.valor_interno_paquete)}
        </td>
        <td className="table-content text-center">
          {nf.format(itemValues.valor_total)}
        </td>
        <td className="table-content text-center">
          {nf.format(itemValues.valor_m2const)}
        </td>
        <td className="table-content text-center">
          {nf.format(itemValues.valor_m2vent)}
        </td>
        <td className="table-content text-center">
          {nf_per.format(itemValues.incidencia)}
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
            +
          </Link>
        </td>
      </tr>
      {items.map((item) => (
        <BudgetTableBodyItemSub key={item.da} item={item} open={open} />
      ))}
    </>
  );
};

export default BudgetTableBodyItem;
