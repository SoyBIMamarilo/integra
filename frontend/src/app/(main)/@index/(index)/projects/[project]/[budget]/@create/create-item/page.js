import Modal from "@/components/modal/create-modal";
import { fetchEjecutados } from "@/app/actions/budget-actions";
import CreateItem from "./components/create";

export default async function Create({ params, searchParams }) {
  const ejecutados = await fetchEjecutados();
  const paquete = searchParams.paquete;


  return (
    <>
      <Modal>
        <div className="mb-2 text-lg font-bold">Añadir Item</div>
        <CreateItem presupuestos={ejecutados} />
      </Modal>
    </>
  );
}
