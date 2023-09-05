"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getIndicadores, postReferente } from "@/app/actions/actions";

const CreateItemFactor = ({ selected, setIndicador }) => {
  const params = useParams();
  const selectedProject = params.project;

  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    const fetchIndicadores = async () => {
      const indicadores = await getIndicadores(
        selected.proyecto_id,
        selectedProject
      );
      setIndicadores(indicadores.indicadores);
    };
    if (selected) {
      fetchIndicadores();
    }
  }, [selected, selectedProject]);

  const changeSelectHandler = (e) => {
    const id = e.target.value;
    if (!id) {
      setIndicador(null);
      return;
    }
    setIndicador(indicadores.filter((indicador) => indicador.id == id)[0]);
  };
  const component = selected && (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      <div>Indicadores disponibles</div>
      <select onChange={changeSelectHandler}>
        <option value={null} selected />
        {indicadores.map((ind) => (
          <option value={ind.id}>{ind.abreviatura}</option>
        ))}
      </select>
    </div>
  );
  return component;
};

export default CreateItemFactor;
