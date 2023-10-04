"use client";

import { useEffect, useState } from "react";


const BudgetControls = async (params) => {
    let { project, budget } = params;
    const [projectID, setProject] = useState("")
    const [itprojects, setProjects] = useState([])
    const [items, setItems] = useState([{ label: "Choose one", value: "" }])

    let Ibudgets = [];
    const getBudgets = async (budget_destine) => {
        fetch(`/api/budget/comparer/${budget}/${budget_destine}`)
            .then(response => response.json())
            .then(data => {
                if (!data) return alert("No Existe informacion a Comparar.");
                Ibudgets = data;
            })
            .catch(err => { console.error("Comparer", err); });
    };

    const getprojects = async () => {
        fetch(`/api/projects`)
            .then(response => response.json())
            .then(data => {
                if (!data) return alert("No Existen Projectos.");
                setProjects(data.map(({ item }) => ({ label: item.name, id: item.id })));
            })
            .catch(err => { console.error("Comparer", err); });
    };
    setProjects({ label: "Vacio", id: "" })
    getprojects();
    useEffect(() => {
        console.log("gfhgfhgfg");    
        const getVersions = async (project_id) => {
            if (!project_id) return setItems({ label: "Vacio", value: "" })
            fetch(`/api/projects/${project_id}/versions`)
                .then(response => response.json())
                .then(data => {
                    if (!data) return alert("No Existen Versiones.");
                    //IVersions = data;
                    setItems(data.map(({ item }) => ({ label: item.version, value: item.id })));
                })
                .catch(err => { console.error("versiones", err); });
        }
        setItems({ label: "Vacio", value: "" })
        //getVersions(projectID);
    }, [projectID]);

    return (
        <>
            <label for="cbProjects" className="basis-1/4">Proyectos </label>
            <select id="cbProjects" onChange={e => setProject(e.currentTarget.value)} class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {itprojects.map((option) => {
                    (
                        <option key={option.id} value={option.label}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            <label for="cbVersion" className="basis-1/4">Versiones </label>
            <select id="cbVersion" onChange={console.log("NumeroLlanadas")} class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {items.map((option) => {                
                        <option key={option.value} value={option.label}>
                            {option.label}
                        </option>                   
                })}
            </select>
        </>
    )
};

export default BudgetControls