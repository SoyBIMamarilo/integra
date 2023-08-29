"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { deletePresupuestoPaquete } from "@/app/actions/budget-actions";
import BudgetTableBodyItemSub from "./BudgetTableBodyItemSubItem";
import Trash from "@/components/svg/trash";
import { nf, nf_per } from "@/util/date-format";
import Arrow from "@/components/svg/arrow";
import Plus from "@/components/svg/plus";

const BudgetTableBodyItem = ({ paquete, itemValue, packageValue }) => {
  const path = usePathname() + "/create-item";
  const packageValueAdj = packageValue ? packageValue : {};
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
      <tr className="text-xs font-semibold">
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center pl-2">
            <div onClick={clickHandler} className="grow ">
              {paquete.nombre}
            </div>
            <Arrow open={open} />
          </div>
        </td>
        <td />
        <td className="table-content text-center">
          {packageValueAdj.indicador} m2
        </td>
        <td className="table-content text-center">
          {nf.format(packageValueAdj.valor_interno_paquete)}
        </td>
        <td className="table-content text-center">
          {nf.format(packageValueAdj.valor_total)}
        </td>
        <td className="table-content text-center">
          {nf.format(packageValueAdj.valor_m2const)}
        </td>
        <td className="table-content text-center">
          {nf.format(packageValueAdj.valor_m2vent)}
        </td>
        <td className="table-content text-center">
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
      </tr>
      {itemValue.map((item) => (
        <BudgetTableBodyItemSub key={item.da} item={item} open={open} />
      ))}
    </>
  );
};

export default BudgetTableBodyItem;
