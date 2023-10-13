"use client";

import { useRouter } from "next/navigation";

const CreateProjectForm = ({ ciudades, indicadores }) => {
  const router = useRouter();
  const submitHandler = async (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const ciudad = event.target.ciudad.value;
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, ciudad }),
    });
    const createdProject = await res.json();
    if (res.ok) {
      const proyecto_id = createdProject.id;
      const res_construido = await fetch("/api/indexes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          indicador_id: 1,
          proyecto_id,
          valor: +event.target.m2const.value,
        }),
      });
      const res_vendible = await fetch("/api/indexes", {
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
    } else {
      alert(
        `No se ha podido crear el nuevo proyecto ya que se presenta el siguiente error: ${createdProject.message}`
      );
    }
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
          <label>m2 const*</label>
          <input className="rounded-sm" type="number" name="m2const" />
          <label>m2 vend*</label>
          <input className="rounded-sm" type="number" name="m2vend" />
        </div>
        <div className="mt-2 flex flex-row justify-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-solid	 border-white bg-integra-text px-5 py-1 font-bold text-white"
          >
            Crear Proyecto
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background px-5 py-1 font-bold text-integra-text "
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectForm;
