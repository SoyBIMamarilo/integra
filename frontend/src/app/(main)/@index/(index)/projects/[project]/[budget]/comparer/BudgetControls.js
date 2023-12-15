"use client";

import { useEffect, useState } from "react";

const BudgetControls = (params) => {
  let { project, budget, onSelectProyect } = params;
  const [selectedproject, setProjectSelected] = useState("");
  const [selectedversion, setVersionSelected] = useState("");
  const [itprojects, setProjects] = useState([]);
  const [itversions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getprojects = async () => {
      let res = await fetch(`/api/projects`);
      let data = await res.json();
      if (!data) return alert("No Existen Projectos.");
      data = data.map((item) => ({ label: item.nombre, id: item.id }));
      setProjects(data);
      setIsLoading(false);
    };
    getprojects().catch((error) => {
      console.error("Error al obtener projectos:", error);
      setIsLoading(false); // Marcar la carga como completada en caso de error
    });
  }, []);
  useEffect(() => {
    const getVersions = async (project_id) => {
      let reponse = await fetch(`/api/projects/${project_id}/versions`);
      let data = await reponse.json();
      if (!data) return alert("No Existen Versiones.");
      data = data.map((item) => ({ label: item.version, value: item.id }));
      setVersions(data);
    };
    if (selectedproject) getVersions(selectedproject);
  }, [selectedproject]);

  const handleProjectChange = (e) => {
    if (!e) return;
    const selectedproject = e.target.value;
    setProjectSelected(selectedproject);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {!isLoading ? (
          <div className="col-span-1 flex">
            <label htmlFor="cbProjects" className="basis-1/4 pr-2">
              Proyectos:{" "}
            </label>
            <select
              id="cbProjects"
              onChange={handleProjectChange}
              value={selectedproject}
              className="mb-6 block w-full basis-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Selecciona un projecto</option>
              {itprojects.map((projec) => (
                <option className="text-xs" key={projec.id} value={projec.id}>
                  {projec.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Proyectos...</p>
        )}
        {itversions.length > 0 ? (
          <div className="col-span-1 flex">
            <label htmlFor="cbVersion" className="basis-1/4 pr-2">
              Versiones:{" "}
            </label>
            <select
              id="cbVersion"
              onChange={(e) => {
                setVersionSelected(e.target.value);
                onSelectProyect(e, selectedproject);
              }}
              value={selectedversion}
              className="mb-6 block w-full basis-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Selecciona una Version</option>
              {itversions.map((version) => (
                <option
                  className="text-xs"
                  key={version.value}
                  value={version.value}
                >
                  {version.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Versiones...</p>
        )}
      </div>
    </>
  );
};

export default BudgetControls;
