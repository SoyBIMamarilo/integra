"use client";

import Input from "./input";
import LogoAmarilo from "../public/amarilo-logo.png";
import Image from "next/image";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

export default function PasswordForm(props) {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const supabase = createClient("https://kfkiyhtoznvoealcynsj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma2l5aHRvem52b2VhbGN5bnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1MDg1ODcsImV4cCI6MjAwNDA4NDU4N30._d-ZkAwBr5fLh13sTMEVAot3U8b7LQibKMU_X4CVjgk")
  const handleSubmit = (event) => {
    event.preventDefault();
    const signInWithEmail = async () => {
      return await supabase.auth.signInWithPassword({
        email: userName,
        password: password,
      });
    };
    const signUpWithEmail = async ()=>{
      return await supabase.auth.signUp({
        email: userName,
        password: password,
      });

    }
    
    if (props.formType === "login") {
      signInWithEmail().then(({data,error})=>{console.log(data)})
    } else {
      signUpWithEmail().then(({data,error})=>{console.log(data)})
    }
  };

  return (
    <form
      className="flex h-fit w-64 flex-col gap-3"
      onSubmit={handleSubmit}
    >
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
        {props.formType === "login"?"INICIAR SESIÓN":"REGISTRARSE"}
      </button>
      <div className="content-center justify-center">
        <Image src={LogoAmarilo} />
      </div>
      {/* <Link href="/login/login">Modal Activate</Link> */}
    </form>
  );
}
