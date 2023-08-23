// "use client";

// import { createPaquete } from "@/app/actions";
// import Modal from "@/components/modal/create-modal";
import Form from "./form";
import { fetchPaquetesTrabajo } from "@/app/actions/paquetes-actions";
// import { useEffect, useState } from "react";

const Create = async ({ params }) => {
  const paquetes = await fetchPaquetesTrabajo();
  console.log(paquetes);
  // const [paquetes, setPaquetes] = useState(null);

  // useEffect(() => {
  //   const loadPaquetes = async () => {
  //     setPaquetes(fetchPaquetesTrabajo());
  //   };
  //   loadPaquetes;
  // }, [fetchPaquetesTrabajo, setPaquetes]);
  // const router = useRouter();

  // const formSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   const paquete = event.target.selection.value;
  //   createPaquete(params.budget, paquete);
  //   router.refresh();
  //   router.back();
  // };

  return <Form paquetes={paquetes} />;
};

export default Create;
