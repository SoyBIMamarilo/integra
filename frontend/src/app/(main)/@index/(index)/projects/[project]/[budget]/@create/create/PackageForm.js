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
      <div className="grid  grid-cols-2 gap-3">
        {/* <label className="basis-1/4">Paquete: </label> */}
        <div>
          <div className="font-bold">Disponibles</div>
          <div className="h-52 overflow-y-auto">
            {paquetesStatus
              .filter((pq) => pq.include === false)
              .map((pq) => (
                <PackageFormItem
                  packageItem={pq}
                  changeHandler={changeHandler}
                />
              ))}
          </div>
        </div>
        <div>
          <div className="font-bold">Incluir</div>
          <div className="h-52 overflow-y-auto ">
            {paquetesStatus
              .filter((pq) => pq.include === true)
              .map((pq) => (
                <PackageFormItem
                  packageItem={pq}
                  changeHandler={changeHandler}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <button
          type="submit"
          className=" rounded-lg border-2 border-solid	 border-gray12 bg-gray8 px-5 py-1 font-bold text-gray12 hover:bg-gray9"
        >
          Añadir
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className=" rounded-lg border-2 border-solid	 border-red11 bg-red5 px-5 py-1 font-bold text-red11 hover:bg-red6"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PackageForm;
