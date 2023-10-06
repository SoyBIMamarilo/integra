import { createClient } from "@supabase/supabase-js";
// import { cookies, headers } from "next/headers";
import { Suspense } from "react";

import { supabaseOptions } from "@/util/supabase";
import SuspenseComponent from "./testLoading";

export default async function OptionalSession(params) {
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  //   // { db: { schema: "public" } }
  // );
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email: "andres.lozano@amarilo.com",
  //   password: "Amarilo.2023",
  // });
  // // console.log(myHeaders.get("Authorization"));
  // const res = await fetch(
  //   "https://kfkiyhtoznvoealcynsj.supabase.co/rest/v1/prueba",
  //   {
  //     headers: {
  //       apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //       Authorization: `Bearer ${data.session.access_token}`,
  //     },
  //   }
  // );
  // const json = await res.json();
  // console.log("JSON", json);
  // const text = await clickFetch();

  return (
    <>
      <Suspense fallback={<p>LOADING...</p>}>
        <SuspenseComponent />
      </Suspense>
    </>
  );
}
