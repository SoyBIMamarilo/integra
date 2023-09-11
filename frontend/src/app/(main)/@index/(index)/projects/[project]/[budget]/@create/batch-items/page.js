"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Modal from "@/components/modal/create-modal";
import {
  createBudgetPackage,
  uploadTempTable,
} from "@/app/actions/budget-actions";
import { fetchPaquetesTrabajo } from "@/app/actions/paquetes-actions";

const Page = ({ params }) => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadPaquetes = async () => {
      // const temp = await fetchPaquetesTrabajo();
      // setPaquetes(temp);
    };
    loadPaquetes();
  }, [fetchPaquetesTrabajo]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    uploadTempTable(items);
    // createBudgetPackage(params.budget, paquete);
    router.refresh();
    router.back();
  };

  const handleUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const f = event.target.files[0];
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        before: function (file, inputElem) {
          // executed before parsing each file begins;
          // what you return here controls the flow
        },
        error: function (err, file, inputElem, reason) {
          // executed if an error occurs while loading the file,
          // or if before callback aborted for some reason
        },
        complete: function (results, file) {
          const reads = results.data;
          reads.forEach((element) => {
            element.proyecto_id = params.project;
            element.parent_id = params.budget;
          });
          console.log(reads);
          setItems(reads);
        },
      });
    }
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Items de csv</div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid max-w-[70%] grid-cols-2 gap-3">
          <label className="basis-1/4">Archivo csv </label>
          <input
            type="file"
            id="csvfile"
            accept=".csv"
            onChange={handleUpload}
          />
          <button type="submit" className="button-black">
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
      </form>
    </Modal>
  );
};

export default Page;
