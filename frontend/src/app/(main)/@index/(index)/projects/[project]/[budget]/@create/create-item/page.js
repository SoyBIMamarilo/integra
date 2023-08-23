import Modal from "@/components/modal/create-modal";
import { fetchEjecutados } from "@/app/actions/budget-actions";
import CreateItem from "./components/create";

export default async function Create({ params, searchParams }) {
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
        <CreateItem presupuestos={ejecutados} />

        {/* <PresupuestosEjecutados
          presupuestos={ejecutados}
          paquete={paquete}
          budget={params.budget}
        /> */}
      </Modal>
    </>
  );
}
