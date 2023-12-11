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
    <div className="mb-2 flex flex-col">
      <div className="flex flex-row">
        <label className="pr-4">Descripción:</label>
        <input
          ref={searchRef}
          className="ml-2 box-border w-full border-none"
        ></input>
      </div>
      <button onClick={searchHandler} className="flex-0 self-end">
        Buscar
      </button>
    </div>
  );
};

export default Search;
