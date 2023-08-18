"use client";

import { useState, useEffect } from "react";

import CreateItem from "../create-item";
import Datalist from "../datalist";

export default function PresupuestosEjecutados({
  presupuestos,
  paquete,
  budget,
}) {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  const [project, setProject] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [cbs, setCbs] = useState(null);

  const [selectedPresupuestos, setSelectedPresupuestos] =
    useState(presupuestos);

  const [addedPresupuestos, setAddedPresupuestos] = useState(null);
  useEffect(() => {
    setSelectedPresupuestos(
      presupuestos
        .filter(
          (el) => project == null || el.nombre.toLowerCase().includes(project)
        )
        .filter(
          (el) => type == null || el.line_type.toLowerCase().includes(type)
        )
        .filter(
          (el) =>
            description == null ||
            el.descripcion.toLowerCase().includes(description)
        )
        .filter((el) => cbs == null || el.cbs.toLowerCase().includes(cbs))
    );
  }, [project, type, description, cbs]);

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case "proyecto":
        setProject(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "nivel":
        setType(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "descripcion":
        setDescription(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "cbs":
        setCbs(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
    }
  };
  const onAddHandler = (e, p) => {
    setAddedPresupuestos(p);
  };

  const onDeleteHandler = () => {
    setAddedPresupuestos(null);
  };

  return (
    <>
      <div className="mb-2 grid grid-cols-2 ">
        <Datalist
          key="proyecto"
          label="proyecto"
          list={selectedPresupuestos.map((el) => el.nombre)}
          onChange={onChangeHandler}
        />
        <Datalist
          label="nivel"
          list={selectedPresupuestos.map((el) => el.line_type)}
          onChange={onChangeHandler}
        />
        <Datalist
          label="descripcion"
          list={selectedPresupuestos.map((el) => el.descripcion)}
          onChange={onChangeHandler}
        />
        <Datalist
          label="cbs"
          list={selectedPresupuestos.map((el) => el.cbs)}
          onChange={onChangeHandler}
        />
      </div>

      <div>Actividades Disponibles: {selectedPresupuestos.length}</div>
      <div className="mb-5 h-1/4 overflow-auto">
        {selectedPresupuestos.map((ejecutado) => (
          <div
            className="m-2 rounded-md border border-solid bg-neutral-200 p-1"
            value={ejecutado.linea_id}
            onDoubleClick={(event) => onAddHandler(event, ejecutado)}
          >
            <div className="flex flex-row">
              <div className="grow font-light">{ejecutado.descripcion}</div>
              <div>{nf.format(ejecutado.sum)}</div>
            </div>
            <div className="flex flex-row">
              <div className="grow font-bold">{ejecutado.cbs}</div>
              <div>{ejecutado.nombre}</div>
            </div>
          </div>
        ))}
      </div>
      <CreateItem
        selected={addedPresupuestos}
        paquete={paquete}
        budget={budget}
      />
    </>
  );
}
