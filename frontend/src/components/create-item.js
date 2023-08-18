"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getIndicadores, postReferente } from "../app/actions";

export default function CreateItem({ selected, paquete, budget }) {
  console.log(selected);
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  const [indicadores, setIndicadores] = useState(null);
  const [indicador, setIndicador] = useState(null);
  const [ponderacion, setPonderacion] = useState(1);

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

  const changeSelectHandler = (e) => {
    console.log(e.target.value);
    const id = e.target.value;
    if (!id) {
      setIndicador(null);
      return;
    }
    console.log(indicadores.filter((indicador) => indicador.id == id));
    setIndicador(indicadores.filter((indicador) => indicador.id == id)[0]);
  };

  const ponderacionHandler = (e) => {
    console.log(e);
    setPonderacion(e.target.value);
  };

  const submitItemHandler = () => {
    postReferente(
      budget,
      paquete,
      selected.linea_id,
      indicador.id_or,
      indicador.id_dest,
      ponderacion,
      ""
    );
  };

  const card = (
    <>
      <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
        {!selected ? (
          "Selecciona un paquete o cbs para añadir..."
        ) : (
          <>
            <div className=" font-light">{selected.descripcion}</div>
            <div>{nf.format(selected.sum)}</div>
            <div>{selected.cbs}</div>
            <div>{selected.nombre}</div>
            {!indicadores ? null : (
              <>
                <div>Indicadores disponibles</div>
                <select onChange={changeSelectHandler}>
                  <option value={null} selected />
                  {indicadores.map((ind) => (
                    <option value={ind.id}>{ind.abreviatura}</option>
                  ))}
                </select>
                <div>Cantidad Origen</div>
                <div>{!indicador ? "" : indicador.vr_or}</div>
                <div>Cantidad Destino</div>
                <div>{!indicador ? "" : indicador.vr_dest}</div>
                <div>Valor Unitario</div>
                <div>
                  {!indicador
                    ? ""
                    : `${nf.format(selected.sum / indicador.vr_or)} $/${
                        indicador.abreviatura
                      }`}
                </div>
                <div>Factor Ponderación</div>
                <input
                  defaultValue={ponderacion}
                  id="ponderacion"
                  type="number"
                  onChange={ponderacionHandler}
                />
                <div>Descripción Ajuste</div>
                <input />
                <div>Valor Total Destino</div>
                <div>
                  {!indicador
                    ? ""
                    : nf.format(
                        (selected.sum * indicador.vr_dest * ponderacion) /
                          indicador.vr_or
                      )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="mt-4 flex flex-row gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="basis-1/2 rounded border border-solid border-black  bg-black px-1 py-1 text-center font-normal	 text-white"
          onClick={submitItemHandler}
        >
          Crear
        </button>
      </div>
    </>
  );

  return card;
}
