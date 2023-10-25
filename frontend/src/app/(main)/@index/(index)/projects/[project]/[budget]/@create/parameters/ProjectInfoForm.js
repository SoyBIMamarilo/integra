"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import ProjectInfoFormCurrent from "./ProjectInfoFormCurrent";
import ProjectInfoFormNew from "./ProjectInfoFormNew";

export default function ProjectInfoForm({
  project,
  budget,
  indices,
  pendingIndices,
}) {
  const router = useRouter();
  const [input, setInput] = useState([
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
    setInput((prev) => {
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
    setInput((prev) => {
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
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const indexes = input
      .filter((ind) => ind.modify == true)
      .map((ind) => ({
        proyecto_id: project,
        indicador_id: ind.indicador_id,
        valor: ind.valor,
      }));
    console.log(indexes);
    const res = await fetch("/api/budget-indexes-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indexes, budget }),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={formSubmitHandler}>
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
            pendingIndices={input.filter((it) => it.newIndex === true)}
            clickHandler={clickHandler}
            changeHandler={changeHandler}
          />
        </div>
        <div className="mt-2 flex flex-row justify-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-solid	 border-white bg-integra-text px-5 py-1 font-bold text-white"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background px-5 py-1 font-bold text-integra-text"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
