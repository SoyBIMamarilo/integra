"use client";

import { useState } from "react";

import TableItem from "./table-item";

export default function ({ paquete, path }) {
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <tr onClick={clickHandler}>
        <td
          colSpan={1}
          className="h-6 border border-neutral-500 hover:bg-neutral-50"
        >
          {paquete.nombre}
        </td>
        <td />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
        <td className="h-6 border border-neutral-500 hover:bg-neutral-50" />
      </tr>
      {open && <TableItem path={path} />}
    </>
  );
}
