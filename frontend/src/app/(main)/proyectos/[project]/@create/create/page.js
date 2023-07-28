"use client";
import { useRouter, useSearchParams } from "next/navigation";

import Input from "@/src/components/input";
import Modal from "@/src/components/modal/create-modal";

export default function Create(props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("title"));
  return (
    <>
      <Modal />
      {/* <div
        onClick={() => router.back()}
        className="absolute left-0 top-0 z-10 h-screen w-screen"
      ></div>
      <div className="absolute right-0 top-0 z-20 h-screen w-2/6 bg-neutral-100 p-10 text-lg font-semibold">
        <div></div>
        <Input
          type="text"
          element="input"
          id="nombre"
          label="nombre proyecto"
          placeholder="Nombre Proyecto"
        ></Input>
      </div> */}
    </>
  );
}
