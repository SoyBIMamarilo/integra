"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import BudgetTableBodyItemSub from "./BudgetTableBodyItemSubItem";
import BudgetTableBodyItemManual from "./BudgetTableBodyItemManualItem";
import Alert from "./AlertDialog";
import Trash from "@/components/svg/trash";
import { nf, nf_per } from "@/util/date-format";
import Arrow from "@/components/svg/arrow";
import Plus from "@/components/svg/plus";

const BudgetTableBodyItem = ({ packageValue }) => {
  const router = useRouter();
  const total = packageValue.reduce((accumulator, item) => {
    return accumulator + item.vrtot;
  }, 0);
  const totalConst = packageValue.reduce((accumulator, item) => {
    return accumulator + item.vrm2const;
  }, 0);
  const totalVend = packageValue.reduce((accumulator, item) => {
    return accumulator + item.vrm2vend;
  }, 0);
  const incidencia = packageValue.reduce((accumulator, item) => {
    return accumulator + item.incidencia;
  }, 0);
  const indicadorValor = packageValue.reduce((accumulator, item) => {
    return accumulator + item.indicador_valor;
  }, 0);

  const manual = packageValue.filter((it) => it.manual == 1 && it.id);
  const referente = packageValue.filter((it) => it.manual == 0 && it.id);
  const path = usePathname() + "/create-item";
  const unidadMedida = packageValue[0].valor_parametro ? (
    <div>
      {nf.format(packageValue[0].valor_parametro)} {packageValue[0].codigo}
    </div>
  ) : (
    <div className="text-sm">Añadir {packageValue[0].indicador_nombre}</div>
  );
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const deletePaqueteHandler = async () => {
    const res = await fetch("/api/budget-package", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuesto_id: packageValue[0].presupuesto_id,
        paquete_trabajo_id: packageValue[0].paquete_trabajo_id,
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
            <div className="grow">{packageValue[0].paquete}</div>
            <Arrow open={open} />
          </div>
        </td>
        <td />
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {unidadMedida}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(indicadorValor)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(total)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(totalConst)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf.format(totalVend)}
        </td>
        <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
          {nf_per.format(incidencia)}
        </td>
        <td className="w-max">
          <Alert
            name={packageValue[0].paquete}
            value={nf.format(total)}
            onConfirm={deletePaqueteHandler}
          />
        </td>
        <td className="w-min">
          {/* <Link
            href={{
              pathname: path,
              query: { paquete: packageValue[0].paquete_trabajo_id },
            }}
          >
            <Plus />
          </Link> */}
          <Link
            className="w-min"
            href={usePathname() + `/${packageValue[0].paquete_trabajo_id}`}
          >
            <Plus />
          </Link>
        </td>
      </tr>
      {referente.map((item) => (
        <BudgetTableBodyItemSub key={item.id} item={item} open={open} />
      ))}
      {manual.map((item) => (
        <BudgetTableBodyItemManual key={item.id} item={item} open={open} />
      ))}
    </>
  );
};

export default BudgetTableBodyItem;
