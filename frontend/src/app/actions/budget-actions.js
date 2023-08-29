"use server";

import { revalidateTag } from "next/cache";

export const fetchBudgetProject = async (projectId) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/proyecto/${projectId}`,
    {
      next: { tags: ["presupuestos"] },
    }
  );
  const json = await res.json();
  return json;
};

export const fetchProjectValues = async (projectId) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/proyecto/values/${projectId}`,
    {
      next: { tags: ["presupuestos"] },
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
};

export const fetchBudgetItems = async (budgetId) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/items/${budgetId}`,
    { next: { tags: ["presupuestos"] }, cache: "no-store" }
  );
  const json = await res.json();
  return json;
};

export const deleteBudget = async (version) => {
  const res = await fetch(`http://localhost:8080/presupuestos/${version}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json();
  revalidateTag("presupuestos");
};

export const createBudget = async (version, projectId) => {
  await fetch(`http://localhost:8080/presupuestos//proyecto/${projectId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version: version,
    }),
    cache: "no-store",
  });
  revalidateTag("presupuestos");
};

export const fetchBudgetPackage = async (budget) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/paquetes/${budget}`,
    {
      next: { tags: ["paquete"] },
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
};

export const fetchBudgetPackageValues = async (budget) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/paquetes/values/${budget}`,
    {
      next: { tags: ["presupuestos"] },
    }
  );
  const json = await res.json();
  return json;
};

export const fetchBudgetValues = async (budget) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/values/${budget}`,
    {
      next: { tags: ["presupuestos"] },
    }
  );
  const json = await res.json();
  return json;
};

export const createBudgetPackage = async (presupuesto_id, paquete_id) => {
  await fetch(`http://localhost:8080/presupuestos/paquete/${presupuesto_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paquete: paquete_id,
    }),
    cache: "no-store",
  });
  revalidateTag("paquete");
};

export const fetchEjecutados = async () => {
  const res = await fetch("http://localhost:8080/presupuestos/ejecutados");
  const json = await res.json();
  return json;
};

export async function deletePresupuestoPaquete(presupuesto_id, paquete_id) {
  const res = await fetch("http://localhost:8080/presupuestos/paquete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      presupuesto_id,
      paquete_id,
    }),
    cache: "no-store",
  });
  const data = await res.json();
  revalidateTag("paquete");
}
