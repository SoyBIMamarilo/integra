"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import store from "@/src/store/index";
import Modal from "@/src/components/modal/create-modal";

export default function Create({ params }) {
  const router = useRouter();
  const paquetes = store.getState().projects.loadedPaquetes;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const paquete = event.target.selection.value;
    await fetch(`http://localhost:8080/presupuestos/${params.budget}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paquete: paquete,
      }),
    });
    router.refresh();
    router.back();
  };

  return (
    <>
      <Modal>
        <div className="mb-4 text-lg font-bold">Añadir Paquete de Trabajo</div>
        <form onSubmit={formSubmitHandler}>
          <div className="mt-2 flex flex-row gap-2">
            <label className="basis-1/4">Paquete: </label>
            <select
              name="selection"
              className="w-full basis-3/4 border border-none outline-none"
            >
              {paquetes.map((paquete) => (
                <option value={paquete.id}>{paquete.nombre}</option>
              ))}
            </select>
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
