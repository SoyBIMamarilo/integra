"use client";

import Input from "./input";
import LogoAmarilo from "../public/amarilo-logo.png";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/dist/client/components/headers";
import { getAuth,  setAuthCookies } from "./cookieSetter";

export default function PasswordForm(props) {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");



  const supabase = createClient(props.db_host, props.db_anon_key);
  const handleSubmit = (event) => {
    event.preventDefault();
    const signInWithEmail = async () => {
      return await supabase.auth.signInWithPassword({
        email: userName,
        password: password,
      });
    };
    const signUpWithEmail = async () => {
      return await supabase.auth.signUp({
        email: userName,
        password: password,
      });
    };

    if (props.formType === "login") {
      signInWithEmail().then(async ({ data, error }) => {

        const response = await setAuthCookies(
          data.session.access_token,
          data.session.refresh_token
        );
        console.log(await getAuth(props.db_host, props.db_anon_key))
      });
    } else {
      signUpWithEmail().then(({ data, error }) => {
        console.log(data);
      });
    }
  };

  return (
    <form className="flex h-fit w-64 flex-col gap-3" onSubmit={handleSubmit}>
      <h1 className="text-center text-6xl font-semibold">INTEGRA </h1>
      <Input
        type="email"
        element="input"
        id="correo eléctrónico"
        label="Tu correo electrónico"
        placeholder="Tu Correo"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Input
        type="password"
        element="input"
        id="contrasña"
        label="Contraseña"
        placeholder="Tu Contraseña"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        className="rounded-sm border border-solid  border-black bg-black p-2 text-center text-sm font-normal text-white"
        href="/bases-datos"
      >
        {props.formType === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
      </button>
      <div className="content-center justify-center">
        <Image src={LogoAmarilo} />
      </div>
      {/* <Link href="/login/login">Modal Activate</Link> */}
    </form>
  );
}
