import Modal from "@/src/components/modal/create-modal";

export default function Create({ params }) {
  console.log(params.project);

  return (
    <>
      <Modal>
        <div>{params.project}</div>
      </Modal>
    </>
  );
}
