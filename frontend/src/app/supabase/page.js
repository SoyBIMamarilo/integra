import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

import TestComponent from "./TestComponent";

export const dynamic = "force-dynamic";

export default async function OptionalSession(params) {
  // const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  // const cookieLiteral = cookies().get("sb-kfkiyhtoznvoealcynsj-auth-token");
  // const cookie = JSON.parse(cookieLiteral.value);
  // console.log("COOKIE", cookie, "RES COOKIE");
  // const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/prueba`;
  // console.log(`Bearer: ${cookie[0]}`);
  // const res = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //     Authorization: `Bearer: ${cookie[0]}`,
  //   },
  // });
  // console.log("res", res);
  // const json = await res.json();
  // console.log("Json", json);
  // const packages = await supabase.rpc("presupuesto_paquetes_trabajo", {
  //   presupuesto: 1,
  // });
  // console.log(packages);
  return (
    <>
      {/* <TestComponent /> */}
      <div>procesado</div>
    </>
  );
}
