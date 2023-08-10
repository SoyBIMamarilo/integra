"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/src/components/modal/create-modal";

export default function Create({ params }) {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const version = versionRef.current.value;
    const res = await fetch(
      `http://localhost:8080/proyectos/presupuesto/${params.project}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: version,
        }),
      }
    );
    router.refresh();
    router.back();
  };

  return (
    <>
      <Modal>
        <div className="mb-4 font-bold">Crear Versión Presupuesto</div>
        <form onSubmit={formSubmitHandler}>
          <div className="mt-2 box-border flex flex-row flex-wrap items-start justify-evenly gap-2">
            <label className="">Versión: </label>
            <input
              ref={versionRef}
              min="0"
              step=".1"
              type="number"
              className="w-full max-w-[400px] flex-initial basis-2/3 "
            />
            <button type="submit" className="button-black  grow">
              Crear
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="button-black grow "
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
