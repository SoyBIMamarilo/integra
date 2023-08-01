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
    console.log(version);
    await fetch(
      `http://localhost:8080/proyectos/${params.project}/presupuesto`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: version,
        }),
      }
    );
  };

  return (
    <>
      <Modal>
        <div className="mb-4 text-lg font-bold">Crear Versión Presupuesto</div>
        <form onSubmit={formSubmitHandler}>
          <div className="mt-2 flex flex-row gap-2">
            <label className="basis-1/4">Versión: </label>
            <input
              ref={versionRef}
              min="0"
              step=".1"
              type="number"
              className="w-full basis-3/4 border border-none outline-none"
            />
          </div>
          <div className="mt-4 flex flex-row gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
            >
              Crear
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
