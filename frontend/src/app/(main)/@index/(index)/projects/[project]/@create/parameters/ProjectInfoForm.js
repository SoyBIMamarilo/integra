"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import ProjectInfoFormCurrent from "./ProjectInfoFormCurrent";
import ProjectInfoFormNew from "./ProjectInfoFormNew";
import ProjectBasicInfoForm from "./ProjectBasicInfoForm";

export default function ProjectInfoForm({
  project,
  indices,
  ciudades,
  ciudadProyecto,
  pendingIndices,
}) {

  const router = useRouter();

  const [inputParameters, setInputParameters] = useState([
    ...indices.map((elem) => ({
      indicador_id: +elem.indicador_id,
      modify: false,
    })),
    ...pendingIndices.map((elem) => ({
      indicador_id: +elem.id,
      modify: false,
      abreviatura: elem.abreviatura,
      descripcion: elem.descripcion,
      newIndex: true,
    })),
  ]);

  const clickHandler = (value) => {
    console.log(value);
    setInputParameters((prev) => {
      const status = prev.filter((ind) => ind.indicador_id == +value)[0].modify;
      return [
        ...prev.filter((ind) => ind.indicador_id !== +value),
        {
          ...prev.filter((ind) => ind.indicador_id == +value)[0],
          modify: !status,
        },
      ];
    });
  };

  const changeHandler = (value, indicador) => {
    setInputParameters((prev) => {
      const status = prev.filter((ind) => ind.indicador_id == indicador)[0]
        .modify;
      return [
        ...prev.filter((ind) => ind.indicador_id !== indicador),
        {
          ...prev.filter((ind) => ind.indicador_id == indicador)[0],
          modify: status,
          valor: value,
        },
      ];
    });
  };

  const [inputProjectInfo, setInputProjectInfo] = useState(
    {
      nombre: [project.nombre, false],
      ciudad: [project.id_ciudad, false],
      codigo_oracle: [project.codigo_oracle, false],
      link_sharepoint: [project.link_sharepoint, false]
    });

  const clickProjectHandler = (key) => {
    setInputProjectInfo((prev) => {
      const newStatus = !prev[key][1];
      return {
        ...prev,
        [key]: [prev[key][0], newStatus],
      };
    });
  };

  const changeProjectHandler = (state, key) => {
    setInputProjectInfo((prev) => {
      return {
        ...prev,
        [key]: [state, prev[key][1]],
      };
    });
  };



  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const nombre = inputProjectInfo.nombre[0];
    const ciudad = inputProjectInfo.ciudad[0];
    const codigo_oracle = inputProjectInfo.codigo_oracle[0];
    const link_sharepoint = inputProjectInfo.link_sharepoint[0];
    const proyecto_id = project.id
    const indexes = inputParameters
      .filter((ind) => ind.modify == true)
      .map((ind) => ({
        proyecto_id: project.id,
        indicador_id: ind.indicador_id,
        valor: ind.valor,
      }));
    console.log(indexes);
    const resParameters = await fetch("/api/project-indexes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indexes }),
    });

    const resProject = await fetch("/api/update-project", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        ciudad,
        codigo_oracle,
        link_sharepoint,
        proyecto_id,
      }),
    });

    if (resParameters.status === 403) {
      console.log("ERROR!!");
      throw new Error("Creado con valor 0");
    }
    if (resProject.status === 403) {
      console.log("ERROR!!");
      throw new Error("No se encontró información del proyecto seleccionado");
    }
    router.refresh();
    router.back();
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-4 mt-4 text-2xl font-bold">
          Información del proyecto
        </div>
        <div className="flex max-w-[100%] flex-col gap-3">
          <ProjectBasicInfoForm
            ciudades={ciudades}
            ciudad={ciudadProyecto}
            project={project}
            clickHandler={clickProjectHandler}
            changeHandler={changeProjectHandler}
          />
        </div>
        <div className="mb-4 mt-4 text-2xl font-bold">
          Parámetros Presupuesto
        </div>
        <div className="flex max-w-[70%] flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            {indices.map((ind) => (
              <ProjectInfoFormCurrent
                key={ind.indicador_id}
                index={ind}
                clickHandler={clickHandler}
                changeHandler={changeHandler}
              />
            ))}
            <ProjectInfoFormNew
              pendingIndices={inputParameters.filter(
                (it) => it.newIndex === true
              )}
              clickHandler={clickHandler}
              changeHandler={changeHandler}
            />
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <button
              type="submit"
              className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
