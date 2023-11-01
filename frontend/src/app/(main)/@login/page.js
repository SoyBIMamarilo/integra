"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import Input from "@/components/input";

import LogoAmarilo from "@/public/amarilo-logo.png";

export default function Auth() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <div className="flex h-fit w-min flex-col gap-3">
        <h1 className=" p-0 text-6xl font-semibold">INTEGRA </h1>
        <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <Input
            type="email"
            element="input"
            id="correo eléctrónico"
            label="Tu correo electrónico"
            placeholder="Tu Correo"
            name="email"
          />
          <Input
            type="password"
            element="input"
            id="contrasña"
            label="Contraseña"
            placeholder="Tu Contraseña"
            name="password"
          />

          <button className="button-black grow">INICIAR SESIÓN</button>
        </form>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
}
