"use server";

import { getAuth } from "@/components/cookieSetter";
import { revalidateTag } from "next/cache";

export const fetchPaquetesTrabajo = async () => {
  const res = await fetch("http://localhost:8080/bases-datos/paquetes-trabajo",{
    headers:{access_token: await getAuth(process.env.DB_HOST,process.env.DB_ANON_KEY)}
  });
  const json = await res.json();
  return json;
};
