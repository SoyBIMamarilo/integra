"use client";
import { useRouter } from "next/navigation";

import Input from "@/app/login/components/input";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm"
      ></div>
      <div className="absolute right-0 top-0 z-20 h-screen w-2/6 bg-neutral-100 p-10 text-lg font-semibold">
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
