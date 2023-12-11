"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { nf } from "@/util/date-format";

const AddedTaleItem = ({ item, changeItemHandler }) => {
  const [ponderacion, setPonderacion] = useState(1);
  const [indicadores, setIndicadores] = useState([]);
  const [selectedIndicador, setSelectedIndicador] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchIndicadores = async () => {
      const res = await fetch("/api/common-indexes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyecto_id: item.proyecto_id,
          budget: params.budget,
        }),
      });
      const commonIndices = await res.json();
      console.log(commonIndices);
      setIndicadores(commonIndices);
    };

    fetchIndicadores();
  }, []);

  const factorChangeHandler = (e) => {
    const id = e.target.value;
    console.log(id);
    if (id == "Selecciona..") {
      setSelectedIndicador(null);
      return;
    }
    const newIndicador = indicadores.filter(
      (indicador) => indicador.id == id
    )[0];
    const newItem = {
      ...item,
      indicador_origen_id: newIndicador.id_or,
      indicador_destino_id: newIndicador.id_dest,
    };
    setSelectedIndicador(newIndicador);
    changeItemHandler(newItem);
  };

  const ponderacionHandler = (e) => {
    setPonderacion(e.target.value);
    const newItem = { ...item, factor_ponderacion: e.target.value };
    // console.log(changeItemHandler);
    changeItemHandler(newItem);
  };
  const descripcionHandler = (e) => {
    const newItem = { ...item, descripcion_ajuste: e.target.value };
    changeItemHandler(newItem);
  };

  return (
    <tr>
      <td className="sticky left-0 h-8 border border-solid border-neutral-200 text-center hover:bg-neutral-50">{item.descripcion}</td>
      <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">{nf.format(item.sum)}</td>
      <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
        <select defaultValue={null} onChange={factorChangeHandler}>
          <option value={null}>Selecciona..</option>
          {indicadores.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.abreviatura}
            </option>
          ))}
        </select>
      </td>
      {selectedIndicador ? (
        <>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">{nf.format(selectedIndicador.vr_or)}</td>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">{nf.format(selectedIndicador.vr_dest)}</td>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">{nf.format(item.sum / selectedIndicador.vr_or)}</td>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
            <input
              className="box-border w-full border-none"
              defaultValue={ponderacion}
              id="ponderacion"
              type="number"
              onChange={ponderacionHandler}
            />
          </td>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
            {nf.format(
              (item.sum * selectedIndicador.vr_dest * ponderacion) /
              selectedIndicador.vr_or
            )}
          </td>
          <td className="h-8 border border-solid border-neutral-200  	 text-center hover:bg-neutral-50">
            <textarea onChange={descripcionHandler} className="w-full" />
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default AddedTaleItem;
