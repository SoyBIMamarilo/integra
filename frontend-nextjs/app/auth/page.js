"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Input from "./components/input";
import Button from "./components/button";

import LogoAmarilo from "../../public/amarilo-logo.png";

const Auth = () => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap w-100 h-screen justify-center content-evenly">
      <div className="flex flex-col w-64 gap-3 h-fit">
        <h1 className="font-semibold text-6xl text-center">INTEGRA</h1>
        <Input
          type="email"
          element="input"
          id="correo eléctrónico"
          label="Tu correo electrónico"
          placeholder="Tu Correo"
        />
        <Input
          type="password"
          element="input"
          id="contrasña"
          label="Contraseña"
          placeholder="Tu Contraseña"
        />
        <Button onClick={() => router.push("/main")}>INICIAR SESIÓN</Button>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
