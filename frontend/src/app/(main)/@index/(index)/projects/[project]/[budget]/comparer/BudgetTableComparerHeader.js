
"use client";
import { useEffect, useState } from "react";

const BudgetTableComparerHeader = ({ projectName, selectedproject }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectNameOr, setProjectName] = useState("");
  const [projectNameDes, setProjectNameDes] = useState("");
  useEffect(() => {
    const getprojects = async () => {
      let res = await fetch(`/api/projects`);
      let data = await res.json();
      if (!data)
        return alert("No Existen Projectos.");
      const projectOrigen = data.find(item => item.id == projectName);
      setProjectName(projectOrigen ? projectOrigen.nombre : "");
      const projectDestino = data.find(item => item.id == selectedproject);
      setProjectNameDes(projectDestino ? projectDestino.nombre : "");
      setIsLoading(false);
    };
    if (selectedproject)
      getprojects().catch(error => {
        console.error('Error al obtener projectos:', error);
        setIsLoading(false); // Marcar la carga como completada en caso de error
      });
  }, [selectedproject]);
  return (
    <>

      <thead>
        <tr>
          <th colSpan="8" className="table-header w-[50%]">{!isLoading ? (projectNameOr ? projectNameOr : "") : ("Proyecto Origen")}</th>
          <th className="w-4"></th>
          <th className="w-4"></th>
          <th colSpan="9" className="table-header w-[50%]">{!isLoading ? (projectNameDes ? projectNameDes : "") : ("Proyecto Destino")}</th>
        </tr>
        <tr>
          <th className="table-header w-[35%]">Costo Directo</th>
          <th className="w-4"></th>
          <th className="table-header w-[11%]">Area</th>
          <th className="table-header w-[11%]">Costo M2 Subcapitulo</th>
          <th className="table-header w-[11%]">Valor Total</th>
          <th className="table-header w-[11%]">Valor Total M2 Area Construida</th>
          <th className="table-header w-[11%]">Valor Total M2 Area Vendible</th>
          <th className="table-header w-[11%]">% Incidencia</th>
          <th className="w-4"></th>
          <th className="w-4"></th>
          <th className="w-4 gap-1"></th>
          <th className="table-header w-[11%]">Area</th>
          <th className="table-header w-[11%]">Costo M2 Subcapitulo</th>
          <th className="table-header w-[11%]">Valor Total</th>
          <th className="table-header w-[11%]">Valor Total M2 Area Construida</th>
          <th className="table-header w-[11%]">Valor Total M2 Area Vendible</th>
          <th className="table-header w-[11%]">% Incidencia</th>
          <th className="w-4"></th>
          <th className="w-4"></th>
        </tr>
      </thead>


    </>
  );
};

export default BudgetTableComparerHeader;