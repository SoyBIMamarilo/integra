import Image from "next/image";
import Link from "next/link";

import Input from "@/components/input";

import LogoAmarilo from "@/public/amarilo-logo.png";

export default function Reset() {
  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <div className="flex h-fit w-64 flex-col gap-3">
        <h1 className="text-center text-6xl font-semibold">INTEGRA </h1>
        <form className="flex flex-col" action="/api/auth/recover" method="post">
          <Input
            type="email"
            element="input"
            id="correo eléctrónico"
            label="Tu correo electrónico"
            placeholder="Tu Correo"
            name="email"
          />

          <button className="button-black grow">Recuperar contraseña</button>
        </form>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
}
