"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const BudgetForm = ({ budgets }) => {
  const router = useRouter();
  const versionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const old_presupuesto_id = event.target.selection.value;
    const version = versionRef.current.value;
    const res = await fetch("/api/budget/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_presupuesto_id,
        version,
      }),
    });
    if (!res.ok) {
      const messageRes = await res.json();
      alert(
        `No se ha podido crear el nuevo presupuesto ya que se presenta el siguiente error: ${messageRes.message}`
      );
    } else {
      console.log(res);
      router.refresh();
      router.back();
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid max-w-[70%] grid-cols-2 gap-3">
        <label className="basis-1/4">Version a duplicar: </label>
        <select
          name="selection"
          className="w-full basis-3/4 border border-none outline-none"
        >
          {budgets.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.version}
            </option>
          ))}
        </select>
        <label>Nueva versión: </label>
        <input
          ref={versionRef}
          min="0"
          step=".1"
          type="number"
          name="version"
          id="version"
        />
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <button
          type="submit"
          className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
        >
          Crear Duplicado
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="hover:bg-integra-alert-focuss rounded-lg border-2	 border-solid border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
