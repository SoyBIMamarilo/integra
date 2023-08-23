"use server";

import { revalidateTag } from "next/cache";

export const fetchPaquetesTrabajo = async () => {
  const res = await fetch("http://localhost:8080/bases-datos/paquetes-trabajo");
  const json = await res.json();
  console.log(json);
  return json;
};
