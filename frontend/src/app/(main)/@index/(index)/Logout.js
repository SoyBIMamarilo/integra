"use client";

import { redirect, useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logOutHandler = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.status == 204) {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <button
      onClick={logOutHandler}
      className="m-2 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-2.5 font-bold text-integra-text hover:bg-integra-background-strong"
    >
      Salir
    </button>
  );
};

export default Logout;
