"use client";

import { useRouter } from "next/navigation";

import Modal from "@/components/modal/create-modal";
import PresupuestosEjecutados from "@/components/card/presupuestos-ejecutados";

const fetchEjecutados = async () => {
  const res = await fetch("http://localhost:8080/presupuestos/ejecutados", {
    cache: "no-store",
  });
  const json = await res.json();
  return json;
};

export default async function Create({ params, searchParams }) {
  const router = useRouter();
  const ejecutados = await fetchEjecutados();
  const paquete = searchParams.paquete;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const referente = event.target.selection.value;
    await fetch(
      `http://localhost:8080/presupuestos/${params.budget}/${paquete}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referente: referente,
        }),
      }
    );
    router.refresh();
    router.back();
  };

  return (
    <>
      <Modal>
        <div className="mb-2 text-lg font-bold">Añadir Item</div>
        <PresupuestosEjecutados
          presupuestos={ejecutados}
          paquete={paquete}
          budget={params.budget}
        />
      </Modal>
    </>
  );
}
