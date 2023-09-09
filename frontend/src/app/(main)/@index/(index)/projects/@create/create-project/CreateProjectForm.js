"use client";

import { headers } from "../../../../../../../../next.config";

const CreateProjectForm = ({ ciudades, indicadores }) => {
  const submitHandler = async (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const ciudad = event.target.ciudad.value;
    // const res1 = await fetch("http://localhost:3000/api/indexes/get");
    // const json = await res1.json();
    // console.log(json);
    // const res = await fetch("http://localhost:3000/api/projects/post", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ nombre, ciudad }),
    // });
    // const json = await res.json();

    const project_id = 4;
    // const projectId = json.presupuesto.id;
    const indices = {
      1: event.target.m2const.value,
      3: event.target.m2vend.value,
    };
    const res_indices = await fetch("http://localhost:3000/api/indexes/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id, indices }),
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="grid max-w-[70%] grid-cols-2 gap-3">
        <label>Nombre *</label>
        <input type="text" name="nombre" />
        <label>Ciudad *</label>
        <select name="ciudad">
          {ciudades.map((it) => (
            <option value={it.id}>{it.nombre}</option>
          ))}
        </select>
        <label>m2 const*</label>
        <input type="number" name="m2const" />
        <label>m2 vend*</label>
        <input type="number" name="m2vend" />
        {/* <>
          {indicadores.map((it) => (
            <>
              <label>{it.abreviatura}*</label>
              <input type="number" />
            </>
          ))}
        </> */}
        <button type="submit" className="button-black">
          Crear
        </button>
        <button type="button" className="button-black  ">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
