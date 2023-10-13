"use client";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useRef, useState } from "react";

const BatchForm = ({ project }) => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const fileref = useRef();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (items) {
      const res = await fetch("/api/temp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          project,
          version: versionRef.current.value,
        }),
      });
      router.refresh();
      router.back();
    } else {
      alert("Selecciona un archivo valido para continuar");
    }
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
          if (results.meta.fields.includes("Id")) {
            const reads = results.data;
            const adjustedList = [];
            reads.forEach((element) => {
              const id = +element.Id;
              const parent_id = +element.ParentId;
              const cbs = element.CBS;
              const descripcion = element["Descripción"];
              const unidad_medida = element.UdM;
              const cantidad = +element.Cantidad;
              const precio = +element["Precio unitario"];
              const line_type = element["BoQ Line Type"];
              adjustedList.push({
                id,
                parent_id,
                cbs,
                descripcion,
                unidad_medida,
                cantidad,
                precio,
                line_type,
              });
              // console.log(element);
              // element.parent_id = budget;
            });
            setItems(adjustedList);
            console.log(adjustedList)
          } else {
            alert("Ingresa un archivo valido");
            fileref.current.value = "";
          }
        },
      });
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid max-w-[70%] grid-cols-2 gap-3">
        <label className="basis-1/4">Archivo csv </label>
        <input
          type="file"
          id="csvfile"
          accept=".csv"
          onChange={handleUpload}
          ref={fileref}
        />
        <label>Versión: </label>
        <input
          ref={versionRef}
          min="0"
          step=".1"
          type="number"
          name="version"
          id="version"
        />
        <button type="submit" className="button-black">
          Importar
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
  );
};

export default BatchForm;
