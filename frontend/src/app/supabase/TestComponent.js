"use client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { supabaseOptions } from "@/util/supabase";
import { useState } from "react";

import Loading from "./loading";

const promise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 300);
  });
};

export default function TestComponent() {
  const [loading, setLoading] = useState(false);
  //const supabase = createServerComponentClient({ /*cookies*/ }, supabaseOptions);
  // const allCookies = cookies().getAll();
  // console.log(allCookies);
  // const packages = await supabase.rpc("presupuesto_paquetes_trabajo", {
  //   presupuesto: 1,
  // });
  const callHandler = async () => {
    console.log("Loading");
    setLoading(true);
    await promise();
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <div>procesado</div>
      <button onClick={callHandler}>test Btn</button>
    </>
  );
}
