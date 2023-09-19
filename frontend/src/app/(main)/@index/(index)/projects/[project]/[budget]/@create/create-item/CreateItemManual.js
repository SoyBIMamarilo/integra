"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";

import { useSearchParams, useRouter } from "next/navigation";

import { nf } from "@/util/date-format";

const CreateItemManual = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const presupuesto_id = params.budget;
  const paquete_trabajo_id = searchParams.get("paquete");
  const descripcion = useRef();
  const nombre = useRef();
  const valor = useRef();

  const submitItemHandler = async () => {
    const res = await fetch("http://localhost:3000/api/item-manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuesto_id,
        paquete_trabajo_id,
        descripcion: descripcion.current.value,
        nombre: nombre.current.value,
        valor: valor.current.value,
      }),
    });
    console.log(res);
    router.refresh();
    router.back();
  };

  return (
    <>
      <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
        <div>Nombre Ajuste:</div>
        <input ref={nombre} id="nombreManual" />
        <div>Valor Ajuste:</div>
        <input ref={valor} id="number" type="text" />
        <div>Descripción Ajuste</div>
        <textarea ref={descripcion} name="descripcionAjuste" rows={4} />
      </div>
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

export default CreateItemManual;
