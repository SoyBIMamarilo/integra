"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getIndicadores } from "../app/actions";

export default function CreateItem({ selected, onDelete }) {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [indicadores, setIndicadores] = useState(null);
  useEffect(() => {
    const fetchIndicadores = async () => {
      const indicadores = await getIndicadores(
        selectedProject.id,
        selected.proyecto_id
      );
      setIndicadores(indicadores.indicadores);
    };
    if (selected) {
      fetchIndicadores();
    }
    console.log(indicadores);
  }, [selected, selectedProject]);

  const card = (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      {!selected ? (
        "Selecciona un paquete o cbs para añadir..."
      ) : (
        <>
          <div className=" font-light">{selected.descripcion}</div>
          <div>{nf.format(selected.sum)}</div>
          <div>{selected.cbs}</div>
          <div>{selected.nombre}</div>
          <div>Indicadores disponibles</div>
          <select></select>
          <div>Indicador proyecto Origen</div>
          <div>$</div>
          <div>Cantidad Origen</div>
          <div>$</div>
          <div>Cantidad Destino</div>
          <div>$</div>
          <div>Factor Ponderación</div>
          <input />
          <div>Descripción Ajuste</div>
          <input />
          <div>Valor Total Destino</div>
          <div>$</div>
          <div></div>
        </>
      )}
    </div>
  );

  return card;
}
