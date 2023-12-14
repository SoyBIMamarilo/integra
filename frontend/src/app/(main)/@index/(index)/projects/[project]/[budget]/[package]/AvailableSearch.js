"use client";

import { useEffect, useRef } from "react";

const AvailableSearch = ({ setSearchItemsHandler }) => {
  const searchRef = useRef();

  const searchHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/search-historic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: `%${searchRef.current.value}%` }),
    });
    const data = await res.json();
    setSearchItemsHandler(data);
  };
  const cancelHandler = () => {
    setSearchItemsHandler(null);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="mb-2 flex flex-col gap-2 text-xs font-bold"
    >
      <div className="flex flex-row self-end">
        <label className="pr-4">Descripción:</label>
        <input
          ref={searchRef}
          className="ml-2 box-border w-32 border-none bg-integra-background-light"
        ></input>
      </div>
      <div className="flex-0 flex flex-row gap-2 self-end">
        <button
          type="button"
          onClick={cancelHandler}
          className="hover:bg-integra-alert-focuss rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 text-xs font-bold text-integra-text hover:bg-integra-alert-focus"
        >
          Volver
        </button>
        <button
          type="submit"
          onClick={searchHandler}
          className=" rounded-lg border-2 border-solid border-integra-text	 bg-integra-confirm-main px-5 py-1 text-xs font-bold text-integra-text hover:bg-integra-confirm-focus"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default AvailableSearch;
