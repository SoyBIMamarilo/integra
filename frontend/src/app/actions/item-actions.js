"use server";
import { revalidateTag } from "next/cache";
export const deleteItem = async (itemId) => {
  const res = await fetch(`http://localhost:8080/items/${itemId}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json();
  revalidateTag("presupuestos");
};
