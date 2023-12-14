"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/input";

import LogoAmarilo from "@/public/amarilo-logo.png";
import { useRouter } from "next/navigation";

export default function Reset() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pass1 = e.target[0].value;
    const pass2 = e.target[1].value;
    if (pass1 && pass2 && pass1 === pass2 && pass1.length >= 6) {
      const response = await fetch("http://localhost:3000/api/auth/recover", {
        method: "PATCH",
        body: JSON.stringify({
          newPassword: pass1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const jsonres = await response.json();
      alert(jsonres.message);
      router.push("/");
    } else {
      alert("Las contraseñas no coinciden o no cumplen con la longitud minima");
    }
  };
  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <div className="flex h-fit w-64 flex-col gap-3">
        <h1 className="text-center text-6xl font-semibold">INTEGRA </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="password"
            element="input"
            id="contrasña"
            label="Contraseña"
            placeholder="Contraseña Nueva"
            name="password"
          />
          <Input
            type="password"
            element="input"
            id="contrasña"
            label="Contraseña"
            placeholder="Confirma Contraseña"
            name="password_confirm"
          />

          <button className="button-black grow">Cambiar contraseña</button>
        </form>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
}
