"use client";

import Link from "next/link";

export default function async({ path, paquete }) {
  return (
    <>
      <tr>
        <td className="border border-neutral-500 indent-3">Prueba Item</td>
      </tr>
      <tr>
        <td className="p-2">
          <Link
            href={{
              pathname: path + "/create-item",
              query: { paquete: paquete },
            }}
            className="rounded border border-solid border-black bg-black  p-1 text-white"
          >
            Añadir..
          </Link>
        </td>
      </tr>
    </>
  );
}
