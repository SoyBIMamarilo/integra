"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { createPresupuesto } from "@/src/app/actions";
import Modal from "@/src/components/modal/create-modal";

export default function Create({ params }) {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (datos) => {
    const version = datos.get("version");
    createPresupuesto(version, params.project);
    router.back();
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Crear Versión Presupuesto</div>
      <form action={formSubmitHandler}>
        <div className="mt-2 box-border flex flex-row flex-wrap items-start justify-evenly gap-2">
          <label className="basis-0">Versión: </label>
          <input
            ref={versionRef}
            min="0"
            step=".1"
            type="number"
            className="max-w-[200px] "
            name="version"
            id="version"
          />
          <button type="submit" className="button-black grow basis-0	">
            Crear
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="button-black grow basis-0	 "
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
