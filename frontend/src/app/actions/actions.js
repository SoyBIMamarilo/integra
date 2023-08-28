"use server";

import { revalidateTag } from "next/cache";

export async function getIndicadores(origen_id, destino_id) {
  const res = await fetch(
    `http://localhost:8080/presupuestos/indicadores/${origen_id}/${destino_id}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json;
}

export async function postReferente(
  presupuesto_id,
  paquete_id,
  referente_id,
  origen_id,
  destino_id,
  ponderacion,
  descripcion
) {
  await fetch(
    `http://localhost:8080/presupuestos/referente/${presupuesto_id}/${paquete_id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referente_id,
        origen_id,
        destino_id,
        ponderacion,
        descripcion,
      }),
      cache: "no-store",
    }
  );
  revalidateTag("presupuestos")
}

export async function getReferente(presupuesto_id, paquete_trabajo_id) {
  console.log("Getting referente");
  const res = await fetch(
    `http://localhost:8080/presupuestos/paquetes/${presupuesto_id}/${paquete_trabajo_id}`
  );
  const json = await res.json();
  console.log(json);
  return json;
}
