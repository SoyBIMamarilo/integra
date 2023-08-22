"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deletePresupuestoPaquete } from "@/app/actions";
import TableItem from "./table-item";
import Trash from "../svg/trash";

export default function ({ paquete, path }) {
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
      <tr>
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2">
            <div onClick={clickHandler} className="grow ">
              {paquete.nombre}
            </div>
            <Trash onClick={deletePaqueteHandler} />
          </div>
        </td>
        <td />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
      </tr>
      {open && (
        <TableItem
          path={path}
          paquete={paquete.paquete_trabajo_id}
          presupuesto={paquete.presupuesto_id}
        />
      )}
    </>
  );
}
