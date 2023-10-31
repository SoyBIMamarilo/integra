"use client";

import { useState, useEffect } from "react";

import CreateItemSearchData from "./CreateItemSearchData";
import CreateItemSearchAvailable from "./CreateItemSearchAvailable";

const CreateItemSearch = ({ onAddHandler, filterLists }) => {
  const [project, setProject] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [cbs, setCbs] = useState(null);
  const [totals, setTotals] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [selectedPresupuestos, setSelectedPresupuestos] = useState([]);
  const itemsPerPage = 100;

  useEffect(() => {
    console.log(project);
    console.log(description);

    console.log(filterLists);
    const filters = { project, type, description, cbsin: cbs };

    const calcTotals = async () => {
      const resTotal = await fetch("/api/item/filtereditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters, count: true }),
      });
      const total = await resTotal.json();
      setTotals(total);
      setPages(Math.ceil(total / itemsPerPage) || 1);
    };
    calcTotals();

    setCurrentPage(1);
  }, [project, type, description, cbs]);

  useEffect(() => {
    const filters = { project, type, description, cbsin: cbs };
    const get_entrees = async () => {
      const resTotal = await fetch("/api/item/filtereditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters,
          limit: itemsPerPage,
          page: currentPage,
          count: false,
        }),
      });
      const result = await resTotal.json();
      setSelectedPresupuestos(result);
    };
    get_entrees();
  }, [currentPage]);

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case "Proyecto":
        setProject(event.target.value == "" ? null : event.target.value);
        break;
      case "Nivel":
        setType(event.target.value == "" ? null : event.target.value);
        break;
      case "Descripcion":
        setDescription(event.target.value == "" ? null : event.target.value);
        break;
      case "CBS":
        setCbs(event.target.value == "" ? null : event.target.value);
        break;
    }
  };

  return (
    <>
      <div className="mb-2 grid grid-cols-2 ">
        <CreateItemSearchData
          key="proyecto"
          label="Proyecto"
          onChange={onChangeHandler}
          list={filterLists.projectList}
        />
        <CreateItemSearchData
          label="line_type"
          key="Nivel"
          onChange={onChangeHandler}
          list={filterLists.line_typesList}
        />
        <CreateItemSearchData
          label="Descripcion"
          key="descripcion"
          onChange={onChangeHandler}
          list={filterLists.descriptionList}
        />
        <CreateItemSearchData
          label="CBS"
          key="cbs"
          onChange={onChangeHandler}
          list={filterLists.cbsList}
        />
      </div>

      <div>Actividades Disponibles: {totals}</div>
      <div className="mb-3 h-1/4 overflow-auto">
        <CreateItemSearchAvailable
          onAddHandler={onAddHandler}
          selectedPresupuestos={selectedPresupuestos}
          filters={{ project, type, description, cbsIn: cbs }}
        />
      </div>
      <nav
        class="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Se muestran{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totals)}
          </span>{" "}
          de{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {totals}
          </span>
        </span>
        <ul class="inline-flex h-8 -space-x-px text-sm">
          <li>
            <a
              href="?p=1"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((c) => Math.max(c - 1, 1));
              }}
              class="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Anterior
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              {currentPage}
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((c) => Math.min(c + 1, pages));
              }}
              class="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CreateItemSearch;
