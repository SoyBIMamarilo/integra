"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/modal/create-modal";
import { createBudget } from "@/app/actions/budget-actions";

export default function Create({ params }) {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const version = versionRef.current.value;
    createBudget(version, params.project);
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
