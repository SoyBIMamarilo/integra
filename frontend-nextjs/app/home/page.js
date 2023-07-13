import Image from "next/image";
import Link from "next/link";

import Input from "./components/input";
import Button from "./components/button";

import LogoAmarilo from "../../public/amarilo-logo.png";

const Auth = () => {
  return (
    <div className="grid gap-6 content-center justify-center h-screen">
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
      <Link href="/main">
        <Button>INICIAR SESIÓN</Button>
      </Link>
      <div className="w-64 content-center justify-center">
        <Image src={LogoAmarilo} />
      </div>
    </div>
  );
};

export default Auth;
