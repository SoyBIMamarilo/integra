"use client";

import { useEffect, useRef } from "react";

const Search = ({ setSearchItemsHandler }) => {
  const searchRef = useRef();

  const searchHandler = async () => {
    const res = await fetch("/api/search-historic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: `%${searchRef.current.value}%` }),
    });
    const data = await res.json();
    setSearchItemsHandler(data);
  };

  return (
    <div className="mb-2 flex flex-col gap-2 text-xs font-bold">
      <div className="flex flex-row self-end">
        <label className="pr-4">Descripción:</label>
        <input
          ref={searchRef}
          className="ml-2 box-border w-32 border-none bg-integra-background-light"
        ></input>
      </div>
      <button
        onClick={searchHandler}
        className="flex-0 self-end rounded-lg border-2 border-solid border-integra-text	 bg-integra-confirm-main px-5 py-1 text-xs font-bold text-integra-text hover:bg-integra-confirm-focus"
      >
        Buscar
      </button>
    </div>
  );
};

export default Search;
