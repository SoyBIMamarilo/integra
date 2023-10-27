"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import PackageFormItem from "./PackageFormItem";

const PackageForm = ({ budget, paquetes }) => {
  const [paquetesStatus, setPaquetesStatus] = useState(
    paquetes.map((pq) => ({ ...pq, include: false }))
  );
  console.log(paquetesStatus);
  const router = useRouter();
  const changeHandler = (id) => {
    setPaquetesStatus((prev) => {
      const newInclude = !prev.filter((it) => it.paquete_trabajo_id == id)[0]
        .include;
      console.log(newInclude);
      return [
        ...prev.filter((it) => it.paquete_trabajo_id != id),
        {
          ...prev.filter((it) => it.paquete_trabajo_id == id)[0],
          include: newInclude,
        },
      ];
    });
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const packagesSend = paquetesStatus
      .filter((pq) => pq.include)
      .map((pq) => ({
        paquete_trabajo_id: pq.paquete_trabajo_id,
        presupuesto_id: +budget,
      }));
    console.log(packagesSend);
    const res = await fetch("/api/budget-package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packagesSend),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="flex max-w-[75%] flex-col ">
        {/* <label className="basis-1/4">Paquete: </label> */}
        <div>
          <div>Paquetes disponibles</div>
          {paquetesStatus
            .filter((pq) => pq.include === false)
            .map((pq) => (
              <PackageFormItem packageItem={pq} changeHandler={changeHandler} />
            ))}
        </div>
        <div>
          <div>Paquetes incluir</div>
          {paquetesStatus
            .filter((pq) => pq.include === true)
            .map((pq) => (
              <PackageFormItem packageItem={pq} changeHandler={changeHandler} />
            ))}
        </div>
        {/* <select
          name="selection"
          className="w-full basis-3/4 border border-none outline-none"
        >
          {paquetes.map((paquete) => (
            <option key={paquete.id} value={paquete.id}>
              {paquete.nombre}
            </option>
          ))}
        </select> */}
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
