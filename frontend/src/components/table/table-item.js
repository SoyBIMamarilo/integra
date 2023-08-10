"use client";

import Link from "next/link";

// async function fetchPaquetes(budget, paquete) {
//   const res = await fetch(
//     `http://localhost:8080/presupuestos/paquetes/${budget}/${paquete}`,
//     {
//       method: "GET",
//       cache: "no-store",
//     }
//   );
//   const json = await res.json();
//   console.log(json);
//   return json;
// }

export default function ({ path, paquete, budget }) {
  // const paquetes = await fetchPaquetes(budget, paquete);
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
