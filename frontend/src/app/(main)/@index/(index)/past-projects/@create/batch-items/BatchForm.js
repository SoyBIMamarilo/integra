"use client";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useState } from "react";

const BatchForm = ({ projects }) => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const project = event.target.proyecto.value;
    const itemsLoad = items.map((it) => ({
      ...it,
      proyecto_id: project,
    }));
    console.log(itemsLoad);
    console.log(items);
    const res = await fetch("/api/temp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsLoad }),
    });
    router.refresh();
    router.back();
  };

  const handleUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const f = event.target.files[0];
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        encoding: "ISO-8859-1",
        before: function (file, inputElem) {},
        error: function (err, file, inputElem, reason) {
          // executed if an error occurs while loading the file,
          // or if before callback aborted for some reason
        },
        complete: function (results, file) {
          const reads = results.data;
          const adjustedList = [];
          console.log(reads);
          reads.forEach((element) => {
            const id = +element.Id;
            const parent_id = element.ParentId ? +element.ParentId : null;
            const cbs = element.CBS;
            const descripcion = element["Descripción"];
            const unidad_medida = element.UdM;
            const cantidad = +element.Cantidad;
            const precio = +element["Precio unitario"];
            const line_type = element["BoQ Line Type"];
            const proyecto_id = project;
            adjustedList.push({
              id,
              parent_id,
              cbs,
              descripcion,
              unidad_medida,
              cantidad,
              precio,
              line_type,
              proyecto_id,
            });
            // console.log(element);
            // element.parent_id = budget;
          });
          // console.log(adjustedList);
          // console.log(reads);
          console.log(adjustedList);
          setItems(adjustedList);
        },
      });
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid max-w-[70%] grid-cols-2 gap-3">
        <label>Proyecto:</label>
        <select name="proyecto">
          {projects.map((it) => (
            <option key={it.proyecto_id} value={it.proyecto_id}>
              {it.proyecto}
            </option>
          ))}
        </select>
        <label>Archivo csv: </label>
        <input type="file" id="csvfile" accept=".csv" onChange={handleUpload} />
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
