"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import PackageFormChart from "./PackageFormChart";
import PackageFormChartItem from "./PackageFormChartItem";

const PackageForm = ({ budget, paquetes }) => {
  const [paquetesStatus, setPaquetesStatus] = useState(
    paquetes.map((pq) => ({ ...pq, include: false })),
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
        <PackageFormChart
          changeHandler={changeHandler}
          title="Disponibles"
          paquetesStatus={paquetesStatus.filter((pq) => pq.include === false)}
        />
        <PackageFormChart
          changeHandler={changeHandler}
          title="Incluir"
          paquetesStatus={paquetesStatus.filter((pq) => pq.include === true)}
        />
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <button
          type="submit"
          className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
        >
          Añadir
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
  );
};

export default PackageForm;
