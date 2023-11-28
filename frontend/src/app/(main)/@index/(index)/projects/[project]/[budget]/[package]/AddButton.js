"use client";

import { useParams, useRouter } from "next/navigation";

const AddButton = ({ addedItems }) => {
  const params = useParams();
  const router = useRouter();
  const submitItemHandler = async () => {
    console.log(addedItems);
    const adjustedItems = addedItems.map((item) => ({
      descripcion_ajuste: item.descripcion_ajuste,
      factor_ponderacion: +item.factor_ponderacion,
      indicador_destino_id: item.indicador_destino_id,
      indicador_origen_id: item.indicador_origen_id,
      referente_id: item.linea_id,
      paquete_trabajo_id: +params.package,
      presupuesto_id: +params.budget,
    }));
    const res = await fetch("/api/multiple-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adjustedItems),
    });
    const data = await res.json();
    router.refresh();
    router.back();
  };
  return (
    <div className="mt-12 flex flex-row gap-4">
      <button
        type="submit"
        className="rounded-lg border-2 border-solid border-integra-text	 bg-integra-confirm-main px-5 py-1 text-xs font-bold text-integra-text hover:bg-integra-confirm-focus"
        onClick={submitItemHandler}
      >
        Añadir
      </button>
      <button
        type="button"
        onClick={() => router.back()}
        className="hover:bg-integra-alert-focuss rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 text-xs font-bold text-integra-text hover:bg-integra-alert-focus"
      >
        Cancelar
      </button>
    </div>
  );
};
export default AddButton;
