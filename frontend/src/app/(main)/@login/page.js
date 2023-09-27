import Image from "next/image";
import Link from "next/link";

import Input from "@/components/input";

import LogoAmarilo from "@/public/amarilo-logo.png";

export default function Auth() {
  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <div className="flex h-fit w-min flex-col gap-3">
        <h1 className=" p-0 text-6xl font-semibold">INTEGRA </h1>
        <form className="flex flex-col" action="/api/auth/login" method="post">
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
          <a href="/reset-password" className="text-center text-blue-600">Olvidé mi contraseña</a>
        </form>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
}
