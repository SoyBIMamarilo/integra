"use server";

import { revalidateTag } from "next/cache";

export async function deletePresupuesto(version) {
  const res = await fetch(`http://localhost:8080/presupuestos/${version}`, {
    method: "DELETE",
  });

  const data = await res.json();
  revalidateTag("a");
}

export async function createPresupuesto(version, proyecto_id) {
  await fetch(`http://localhost:8080/proyectos/presupuesto/${proyecto_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version: version,
    }),
  });
  revalidateTag("a");
}

export async function deletePresupuestoPaquete(presupuesto_id, paquete_id) {
  const res = await fetch("http://localhost:8080/presupuestos/paquete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      presupuesto_id,
      paquete_id,
    }),
  });
  const data = await res.json();
  console.log(data);
  console.log("eliminando");
  revalidateTag("paquete");
}

export async function createPaquete(presupuesto_id, paquete_id) {
  await fetch(`http://localhost:8080/presupuestos/${presupuesto_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paquete: paquete_id,
    }),
  });
  revalidateTag("paquete");
}

export async function getIndicadores(origen_id, destino_id) {
  console.log("IN GET INDICADORES");
  console.log(origen_id);
  console.log(destino_id);
  const res = await fetch(
    `http://localhost:8080/presupuestos/indicadores/${origen_id}/${destino_id}`
  );

  const json = await res.json();
  return json;
}
