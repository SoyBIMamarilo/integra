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
      setIndicadores(commonIndices);
    };

    fetchIndicadores();
  }, []);

  const factorChangeHandler = (e) => {
    const id = e.target.value;
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
      <td>{item.descripcion}</td>
      <td>{nf.format(item.sum)}</td>
      <td>
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
          <td>{nf.format(selectedIndicador.vr_or)}</td>
          <td>{nf.format(selectedIndicador.vr_dest)}</td>
          <td>{nf.format(item.sum / selectedIndicador.vr_or)}</td>
          <td>
            <input
              className="box-border w-full border-none"
              defaultValue={ponderacion}
              id="ponderacion"
              type="number"
              onChange={ponderacionHandler}
            />
          </td>
          <td>
            {nf.format(
              (item.sum * selectedIndicador.vr_dest * ponderacion) /
                selectedIndicador.vr_or
            )}
          </td>
          <td>
            <textarea onChange={descripcionHandler} className="w-full" />
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default AddedTaleItem;
