import { getCiudades, getIndexes } from "@/app/actions/data-base-actions";
import Modal from "@/components/modal/create-modal";
import CreateProjectForm from "./CreateProjectForm";

const Create = async ({ params }) => {
  const ciudadesData = getCiudades();
  const indicadoresData = getIndexes();

  const [ciudades, indicadores] = await Promise.all([
    ciudadesData,
    indicadoresData,
  ]);
  return (
    <Modal>
      <div className="mb-4 font-bold">Crear Proyecto</div>
      <CreateProjectForm ciudades={ciudades} indicadores={indicadores} />
    </Modal>
  );
};

export default Create;
