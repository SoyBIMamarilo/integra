"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import ProjectInfoFormCurrent from "./ProjectInfoFormCurrent";
import ProjectInfoFormNew from "./ProjectInfoFormNew";

export default function ProjectInfoForm({ project, indices, pendingIndices }) {
  const router = useRouter();
  const [input, setInput] = useState([
    ...indices.map((elem) => ({
      indicador_id: elem.indicador_id,
      modify: false,
    })),
    ...pendingIndices.map((elem) => ({
      indicador_id: +elem.id,
      modify: false,
    })),
  ]);
  const clickHandler = (value) => {
    setInput((prev) => {
      const status = prev.filter((ind) => ind.indicador_id == +value)[0].modify;
      return [
        ...prev.filter((ind) => ind.indicador_id !== +value),
        { indicador_id: +value, modify: !status },
      ];
    });
  };
  const changeHandler = (value, indicador) => {
    setInput((prev) => {
      const status = prev.filter((ind) => ind.indicador_id == indicador)[0]
        .modify;
      return [
        ...prev.filter((ind) => ind.indicador_id !== indicador),
        { indicador_id: indicador, modify: status, valor: value },
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
    const res = await fetch("/api/project-indexes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indexes }),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid w-[70%] max-w-[70%] grid-cols-2 gap-3">
        {indices.map((ind) => (
          <ProjectInfoFormCurrent
            key={ind.indicador_id}
            index={ind}
            clickHandler={clickHandler}
            changeHandler={changeHandler}
          />
        ))}
        <ProjectInfoFormNew
          pendingIndices={pendingIndices}
          clickHandler={clickHandler}
          changeHandler={changeHandler}
        />
        <button type="submit" className="button-black">
          Enviar
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="button-black"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
