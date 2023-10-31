"use client";
import { useRouter } from "next/navigation";

export default async function AddProject({ projects, user }) {
  const router = useRouter();
  const submitHandler = async (event) => {
    event.preventDefault();
    const project = event.target.proyecto.value;
    const response = await fetch("/api/auth/add-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, project }),
    });
    if (!response.ok) {
      const messageRes = await response.json();
      alert(
        `No se ha podido crear la plantilla ya que se presenta el siguiente error: ${messageRes.message}`
      );
    } else {
      router.refresh();
      router.back();
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex max-w-[70%] flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <label>Proyecto</label>
          <select className="rounded-sm" name="proyecto">
            {projects.map((it) => (
              <option key={it.id} value={it.id}>
                {it.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex flex-row justify-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-solid	 border-white bg-integra-text px-5 py-1 font-bold text-white"
          >
            Añadir proyecto
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background px-5 py-1 font-bold text-integra-text "
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
