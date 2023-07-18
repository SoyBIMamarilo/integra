import Image from "next/image";
import Link from "next/link";

import Input from "./components/input";

import LogoAmarilo from "../../public/amarilo-logo.png";

const Auth = () => {
  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <div className="flex h-fit w-64 flex-col gap-3">
        <h1 className="text-center text-6xl font-semibold">INTEGRA </h1>
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
        <Link href="/">INICIAR SESIÓN</Link>
        <div className="content-center justify-center">
          <Image src={LogoAmarilo} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
