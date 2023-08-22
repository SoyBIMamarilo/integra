"use server";

import { revalidateTag } from "next/cache";

export const fetchBudgetProject = async (projectId) => {
  const res = await fetch(
    `http://localhost:8080/presupuestos/proyecto/${projectId}`,
    {
      next: { tags: ["a"] },
    }
  );
  const json = await res.json();

  return json;
};

export async function deleteBudget(version) {
  const res = await fetch(`http://localhost:8080/presupuestos/${version}`, {
    method: "DELETE",
  });

  const data = await res.json();
  revalidateTag("a");
}

export async function createBudget(version, projectId) {
  await fetch(`http://localhost:8080/presupuestos//proyecto/${projectId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version: version,
    }),
  });
  revalidateTag("a");
}
