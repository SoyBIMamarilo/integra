"use client";

import { useRouter } from "next/navigation";

const CreateProjectForm = ({ ciudades, indicadores }) => {
  const router = useRouter();
  const submitHandler = async (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const ciudad = event.target.ciudad.value;
    const res = await fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, ciudad }),
    });
    const createdProject = await res.json();
    const proyecto_id = createdProject.id;
    const res_construido = await fetch("http://localhost:3000/api/indexes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indicador_id: 1,
        proyecto_id,
        valor: +event.target.m2const.value,
      }),
    });
    const res_vendible = await fetch("http://localhost:3000/api/indexes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indicador_id: 3,
        proyecto_id,
        valor: +event.target.m2vend.value,
      }),
    });
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="grid max-w-[70%] grid-cols-2 gap-3">
        <label>Nombre *</label>
        <input type="text" name="nombre" />
        <label>Ciudad *</label>
        <select name="ciudad">
          {ciudades.map((it) => (
            <option key={it.id} value={it.id}>
              {it.nombre}
            </option>
          ))}
        </select>
        <label>m2 const*</label>
        <input type="number" name="m2const" />
        <label>m2 vend*</label>
        <input type="number" name="m2vend" />
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
