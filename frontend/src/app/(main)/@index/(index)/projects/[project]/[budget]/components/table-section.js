"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deletePresupuestoPaquete } from "@/app/actions/budget-actions";
import TableItem from "./table-item";
import Trash from "@/components/svg/trash";

export default function ({ paquete, path, items }) {
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
          </div>
        </td>
        <td />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />
        <td className="table-content" />

        <td>
          <Trash onClick={deletePaqueteHandler} />
        </td>
      </tr>
      {open && items.map((item) => <TableItem key={item.da} item={item} />)}
      {open && (
        <tr>
          <td className="p-3">
            <Link
              href={{
                pathname: path + "/create-item",
                query: { paquete: paquete.paquete_trabajo_id },
              }}
              className="button-black"
            >
              +
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}
