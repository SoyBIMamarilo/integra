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
    if (!res.ok){
      const messageRes = await res.json()
      alert(
        `No se ha podido crear el nuevo presupuesto ya que se presenta el siguiente error: ${messageRes.message}`
      );
    }
    else {
      console.log(res);
    router.refresh();
    router.back();
    }
    
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
          <button type="submit" className="button-black">
            Crear
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="button-black  "
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
