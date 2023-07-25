"use client";
import { useRouter } from "next/navigation";

import Input from "@/app/login/components/input";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="z-10 absolute top-0 left-0 backdrop-blur-sm h-screen w-screen"
      ></div>
      <div className="z-20 absolute top-0 right-0 bg-neutral-100 h-screen w-2/6 p-10 text-lg font-semibold">
        <div>Crear Ciudad</div>
        <Input
          type="text"
          element="input"
          id="nombre"
          label="nombre proyecto"
          placeholder="Nombre Proyecto"
        ></Input>
        <Input
          type="file"
          element="input"
          id="archivo"
          label="masivo"
          placeholder="masivo"
        ></Input>
      </div>
    </>
  );
}
