"use client";

import { useRouter } from "next/navigation";

import Modal from "@/src/components/modal/create-modal";

const fetchEjecutados = async () => {
  const res = await fetch("http://localhost:8080/presupuestos/ejecutados", {
    cache: "no-store",
  });
  const json = await res.json();
  // console.log(json);
  return json;
};

export default async function Create({ params }) {
  const router = useRouter();
  const ejecutados = await fetchEjecutados();
  let nf = new Intl.NumberFormat("en-US");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const paquete = event.target.selection.value;
    await fetch(`http://localhost:8080/presupuestos/${params.budget}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paquete: paquete,
      }),
    });
    router.refresh();
    router.back();
  };

  return (
    <>
      <Modal>
        <div className="mb-4 text-lg font-bold">Añadir Item</div>
        <form onSubmit={formSubmitHandler}>
          <div className="mt-2 flex flex-row gap-2">
            <label className="basis-1/4">Paquete: </label>
            <select
              name="selection"
              className="w-full basis-3/4 border border-none outline-none"
            >
              {ejecutados.map((ejecutado) => (
                <option value={ejecutado.line_id}>{`${ejecutado.descripcion}, ${
                  ejecutado.nombre
                } - ${nf.format(ejecutado.sum)}`}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex flex-row gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
            >
              Crear
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
