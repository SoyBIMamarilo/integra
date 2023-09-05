"use client";

import { useState, useEffect } from "react";

import CreateItemSearchData from "./CreateItemSearchData";
import CreateItemSearchAvailable from "./CreateItemSearchAvailable";

const CreateItemSearch = ({ presupuestos, onAddHandler }) => {
  const [project, setProject] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [cbs, setCbs] = useState(null);

  const [selectedPresupuestos, setSelectedPresupuestos] =
    useState(presupuestos);

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

  return (
    <>
      <div className="mb-2 grid grid-cols-2 ">
        <CreateItemSearchData
          key="proyecto"
          label="proyecto"
          list={selectedPresupuestos.map((el) => el.nombre)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="nivel"
          list={selectedPresupuestos.map((el) => el.line_type)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="descripcion"
          list={selectedPresupuestos.map((el) => el.descripcion)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="cbs"
          list={selectedPresupuestos.map((el) => el.cbs)}
          onChange={onChangeHandler}
        />
      </div>

      <div>Actividades Disponibles: {selectedPresupuestos.length}</div>
      <div className="mb-3 h-1/4 overflow-auto">
        <CreateItemSearchAvailable
          onAddHandler={onAddHandler}
          selectedPresupuestos={selectedPresupuestos}
        />
      </div>
    </>
  );
};

export default CreateItemSearch;
