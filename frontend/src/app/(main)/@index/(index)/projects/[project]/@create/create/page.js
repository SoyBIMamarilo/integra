"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/modal/create-modal";

export default function Create({ params }) {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const version = versionRef.current.value;
    const res = await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version, proyecto_id: params.project }),
    });
    console.log(res);
    router.refresh();
    router.back();
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Crear Versión Presupuesto</div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid max-w-[70%] grid-cols-2 gap-3">
          <label>Versión: </label>
          <input
            ref={versionRef}
            min="0"
            step=".1"
            type="number"
            name="version"
            id="version"
          />
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background px-5 py-1 font-bold text-integra-text "
          >
            Crear
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-lg border-2 border-solid	 border-white bg-integra-text px-5 py-1 font-bold text-white"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
