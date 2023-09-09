"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "@/components/modal/create-modal";
import { createBudgetPackage } from "@/app/actions/budget-actions";
import { fetchPaquetesTrabajo } from "@/app/actions/paquetes-actions";

const Page = ({ params }) => {
  const router = useRouter();
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    const loadPaquetes = async () => {
      // const temp = await fetchPaquetesTrabajo();
      // setPaquetes(temp);
    };
    loadPaquetes();
  }, [fetchPaquetesTrabajo]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const paquete = event.target.selection.value;
    // createBudgetPackage(params.budget, paquete);
    // router.refresh();
    // router.back();
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Items de csv</div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid max-w-[70%] grid-cols-2 gap-3">
          <label className="basis-1/4">Paquete: </label>
          <select
            name="selection"
            className="w-full basis-3/4 border border-none outline-none"
          >
            {/* {paquetes.map((paquete) => (
              <option key={paquete.id} value={paquete.id}>
                {paquete.nombre}
              </option>
            ))} */}
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

export default Page;
