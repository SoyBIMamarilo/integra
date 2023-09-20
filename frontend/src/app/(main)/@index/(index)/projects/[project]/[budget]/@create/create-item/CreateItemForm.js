"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";

const CreateItemForm = ({ indicador, selected }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const paquete = searchParams.get("paquete");

  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });

  const descripcion = useRef();
  const [ponderacion, setPonderacion] = useState(1);

  const ponderacionHandler = (e) => {
    setPonderacion(e.target.value);
  };

  const submitItemHandler = async () => {
    const res = await fetch("/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuesto_id: params.budget,
        paquete_trabajo_id: paquete,
        referente_id: selected.linea_id,
        indicador_origen_id: indicador.id_or,
        indicador_destino_id: indicador.id_dest,
        factor_ponderacion: ponderacion,
        descripcion_ajuste: descripcion.current.value,
      }),
    });
    console.log(res);
    // postReferente(
    //   params.budget,
    //   paquete,
    //   selected.linea_id,
    //   indicador.id_or,
    //   indicador.id_dest,
    //   ponderacion,
    //   descripcion.current.value
    // // );
    router.refresh();
    router.back();
  };

  const card = indicador && (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      <div>Cantidad Origen</div>
      <div>{indicador.vr_or}</div>
      <div>Cantidad Destino</div>
      <div>{indicador.vr_dest}</div>
      <div>Valor Unitario</div>
      <div>
        {`${nf.format(selected.sum / indicador.vr_or)} $/${
          indicador.abreviatura
        }`}
      </div>
      <div>Factor Ponderación</div>
      <input
        defaultValue={ponderacion}
        id="ponderacion"
        type="number"
        onChange={ponderacionHandler}
      />
      <div>Descripción Ajuste</div>
      <input ref={descripcion} />
      <div>Valor Total Destino</div>
      <div>
        {nf.format(
          (selected.sum * indicador.vr_dest * ponderacion) / indicador.vr_or
        )}
      </div>
    </div>
  );

  return (
    <>
      {card}
      <div className="m-2 grid max-w-[70%] grid-cols-2 gap-3">
        <button
          type="submit"
          className="button-black"
          onClick={submitItemHandler}
        >
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
    </>
  );
};

export default CreateItemForm;
