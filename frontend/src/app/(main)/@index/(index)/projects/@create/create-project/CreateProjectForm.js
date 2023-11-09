"use client";

import CreateProjectFormIndices from "./CreateProjectFormIndices";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateProjectForm = ({ ciudades, indices }) => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState([
    ...indices.map((elem) => ({
      indicador_id: +elem.id,
      modify: false,
      abreviatura: elem.abreviatura,
      descripcion: elem.descripcion,
      newIndex: true,
    })),
  ]);

  const clickHandler = (value) => {
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

  const submitHandler = async (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const ciudad = event.target.ciudad.value;
    const indexes = input
      .filter((ind) => ind.modify == true)
      .map((ind) => ({
        indicador_id: ind.indicador_id,
        valor: ind.valor,
      }));

    const res = await fetch("/api/create-project-indexes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, ciudad, indexes }),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex max-w-[70%] flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <label>Nombre *</label>
          <input className="rounded-sm" type="text" name="nombre" />
          <label>Ciudad *</label>
          <select className="rounded-sm" name="ciudad">
            {ciudades.map((it) => (
              <option key={it.id} value={it.id}>
                {it.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 font-bold">Añadir Indicadores</div>
        <div className="grid grid-cols-2 gap-3">
          <CreateProjectFormIndices
            pendingIndices={input.filter((it) => it.newIndex === true)}
            clickHandler={clickHandler}
            changeHandler={changeHandler}
          />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <button
            type="submit"
            className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
          >
            Crear
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
  );
};

export default CreateProjectForm;
