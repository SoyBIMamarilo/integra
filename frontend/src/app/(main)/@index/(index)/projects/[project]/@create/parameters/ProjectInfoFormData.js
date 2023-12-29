"use client";

import { useState } from "react";
import ProjectInfoFormDataItem from "./ProjectInfoFormDataItem";
import ProjectInfoFormDataCities from "./ProjectInfoFormDataCities";

export default function ProjectInfoFormData({
  project,
  ciudades,
  ciudad,
  clickHandler,
  changeHandler,
}) {
  const [editNombre, setEditNombre] = useState(false);
  const [editCiudad, setEditCiudad] = useState(false);
  const [editCodigo, setEditCodigo] = useState(false);
  const [editLinkMemoria, setEditLinkMemoria] = useState(false);
  
  const editNombreHandler = () => {
    setEditNombre((prevEdit) => !prevEdit);
    clickHandler("nombre");
  };

  const editCiudadHandler = () => {
    setEditCiudad((prevEdit) => !prevEdit);
    clickHandler("ciudad_id");
  };

  const editCodigoHandler = () => {
    setEditCodigo((prevEdit) => !prevEdit);
    clickHandler("codigo_oracle");
  };

  const editLinkMemoriaHandler = () => {
    setEditLinkMemoria((prevEdit) => !prevEdit);
    clickHandler("link_sharepoint");
  };

  const changeDataHandler = (event) => {
    changeHandler(event.target.value, event.target.name);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <ProjectInfoFormDataItem
          label={"Nombre"}
          defaultValue={project.nombre}
          editHandler={editNombreHandler}
          edit={editNombre}
          type={"text"}
          changeDataHandler={changeDataHandler}
        />
        <ProjectInfoFormDataCities
          defaultValue={project.ciudad_id}
          editHandler={editCiudadHandler}
          edit={editCiudad}
          changeDataHandler={changeDataHandler}
          ciudad={ciudad}
          ciudades={ciudades}
        />
        <ProjectInfoFormDataItem
          label={"Codigo Oracle"}
          defaultValue={project.codigo_oracle}
          editHandler={editCodigoHandler}
          edit={editCodigo}
          type={"number"}
          changeDataHandler={changeDataHandler}
        />
        <ProjectInfoFormDataItem
          label={"Link memoria sharepoint"}
          defaultValue={project.link_sharepoint}
          editHandler={editLinkMemoriaHandler}
          edit={editLinkMemoria}
          type={"text"}
          changeDataHandler={changeDataHandler}
        />
      </div>
    </>
  );
}
