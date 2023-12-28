"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import CreateFormIndices from "./CreateFormIndices";
import Modal from "@/components/modal/create-modal";

const Create = ({ project, indices }) => {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const version = versionRef.current.value;
    const res = await fetch("/api/create-new-budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version, proyecto_id: project }),
    });
    router.refresh();
    router.back();
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Crear Versión Presupuesto</div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid  max-w-[70%] grid-cols-2 gap-3">
          <label>Versión: </label>
          <input
            ref={versionRef}
            min="0"
            step=".1"
            type="number"
            name="version"
            id="version"
          />
        </div>
        <div className="mt-4	max-w-[70%] font-bold">
          El presuspuesto se creará con los siguientes indicadores, que después
          podrán ser modificados:
        </div>
        <div className=" mt-2 grid grid-cols-2 gap-3">
          {indices.map((ind) => (
            <CreateFormIndices key={ind.indicador_id} index={ind} />
          ))}
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <button
            type="submit"
            className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
          >
            Crear
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Create;
