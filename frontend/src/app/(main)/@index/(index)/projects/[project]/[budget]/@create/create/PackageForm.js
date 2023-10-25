"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PackageForm = ({ budget, paquetes }) => {
  const router = useRouter();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const paquete_trabajo_id = event.target.selection.value;
    const res = await fetch("/api/budget-package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paquete_trabajo_id,
        presupuesto_id: budget,
      }),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid max-w-[50%] grid-cols-2 gap-3">
        <label className="basis-1/4">Paquete: </label>
        <select
          name="selection"
          className="w-full basis-3/4 border border-none outline-none"
        >
          {paquetes.map((paquete) => (
            <option key={paquete.id} value={paquete.id}>
              {paquete.nombre}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex-1 rounded-lg border-2 border-solid	 border-white bg-integra-text px-5 py-1 font-bold text-white"
        >
          Enviar
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background px-5 py-1 font-bold text-integra-text"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PackageForm;
