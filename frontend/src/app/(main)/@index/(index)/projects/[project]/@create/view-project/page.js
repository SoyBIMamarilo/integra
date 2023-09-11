import Modal from "@/components/modal/create-modal";
// import CreateProjectForm from "./CreateProjectForm";

const Create = async ({ params }) => {

  // const [ciudades, indicadores] = await Promise.all([
  //   ciudadesData,
  //   indicadoresData,
  // ]);
  return (
    <Modal>
      <div className="mb-4 font-bold">Ver Projecto</div>
      {/* <CreateProjectForm ciudades={ciudades} indicadores={indicadores} /> */}
    </Modal>
  );
};

export default Create;
