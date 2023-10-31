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
    console.log(project);
    console.log(description);
    console.log(presupuestos[0]);
    setSelectedPresupuestos(
      presupuestos
        .filter(
          (el) =>
            project == null ||
            el.nombre == null ||
            el.nombre.toLowerCase().includes(project)
        )
        .filter(
          (el) =>
            type == null ||
            el.line_type == null ||
            el.line_type.toLowerCase().includes(type)
        )
        .filter(
          (el) =>
            description == null ||
            el.descripcion == null ||
            el.descripcion.toLowerCase().includes(description)
        )
        .filter(
          (el) =>
            cbs == null || el.cbs == null || el.cbs.toLowerCase().includes(cbs)
        )
    );
  }, [project, type, description, cbs]);

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case "Proyecto":
        setProject(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "Nivel":
        setType(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "Descripcion":
        setDescription(
          event.target.value == "" ? null : event.target.value.toLowerCase()
        );
        break;
      case "CBS":
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
          label="Proyecto"
          list={selectedPresupuestos.map((el) => el.nombre)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="Nivel"
          list={selectedPresupuestos.map((el) => el.line_type)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="Descripcion"
          list={selectedPresupuestos.map((el) => el.descripcion)}
          onChange={onChangeHandler}
        />
        <CreateItemSearchData
          label="CBS"
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
