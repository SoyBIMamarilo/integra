"use client";

import Link from "next/link";

export default function ({ path, paquete }) {
  return (
    <>
      <tr>
        <td className="table-content indent-2 text-neutral-700">Prueba Item</td>
      </tr>
      <tr>
        <td className="p-3">
          <Link
            href={{
              pathname: path + "/create-item",
              query: { paquete: paquete },
            }}
            className="button-black"
          >
            +
          </Link>
        </td>
      </tr>
    </>
  );
}
