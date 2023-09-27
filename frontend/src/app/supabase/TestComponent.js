"use client"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export default function TestComponent() {
  //const supabase = createServerComponentClient({ /*cookies*/ }, supabaseOptions);
  // const allCookies = cookies().getAll();
  // console.log(allCookies);
  // const packages = await supabase.rpc("presupuesto_paquetes_trabajo", {
  //   presupuesto: 1,
  // });
  const callHandler = async () => {
    fetch("http://localhost:3000/api/budget/download/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   paquete_trabajo_id,
      //   presupuesto_id: budget,
      // }),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
      }).catch(err => { console.error(err) });
  };
  return (
    <>
      <div>procesado</div>
      <button onClick={callHandler }>test Btn</button>
    </>
  );
}
