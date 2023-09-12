"use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// this page will display with or without a user session
export default function OptionalSession() {
  const onClickHandler = () => {
    fetch("/api/auth/logout", { method: "POST" });
  };
  // const supabase = createServerComponentClient(
  //   { cookies },
  //   {
  //     options: {
  //       db: {
  //         schema: "presupuesto",
  //       },
  //     },
  //   }
  // );
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // // console.log(cookies);
  // const { data, error } = await supabase.from("proyecto").select("*");
  // console.log(error);
  return (
    <>
      {/* <pre>{JSON.stringify({ data }, null, 2)}</pre>{" "} */}
      <button onClick={onClickHandler} className="p-2 text-right text-2xl">
        Salir
      </button>
    </>
  );
}
