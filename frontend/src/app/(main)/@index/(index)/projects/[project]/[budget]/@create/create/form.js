"use client";

import Modal from "@/components/modal/create-modal";
import { createPaquete } from "@/app/actions";

const Form = ({ paquetes }) => {
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const paquete = event.target.selection.value;
    createPaquete(params.budget, paquete);
    router.refresh();
    router.back();
  };
  return (
    <Modal>
      <div className="mb-4 text-lg font-bold">Añadir Paquete de Trabajo</div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid max-w-[70%] grid-cols-2 gap-3 text-base">
          <label className="basis-1/4">Paquete: </label>
          <select
            name="selection"
            className="w-full basis-3/4 border border-none outline-none"
          >
            {paquetes.map((paquete) => (
              <option value={paquete.id}>{paquete.nombre}</option>
            ))}
          </select>
          <button type="submit" className="button-black">
            Crear
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="button-black"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
