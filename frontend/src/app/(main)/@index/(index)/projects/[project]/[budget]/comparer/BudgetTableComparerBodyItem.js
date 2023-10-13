"use client";
import { useState, useEffect } from "react";
let vrtot_origen, vrm2const_origen, vrm2vend_origen, incidencia_origen = 0;
let vrtot_dest, vrm2const_dest, vrm2vend_dest, incidencia_dest = 0;
const BudgetTableComparerBodyItem = ({ budget, budgetDestine }) => {

    const [itcomparer, setComparer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [subTotal, setSubTotal] = useState();
    useEffect(() => {
        const getBudgets = async (budget, budget_destine) => {
            let res = await fetch(`/api/budget/comparer/${budget}/${budget_destine}`);
            let data = await res.json();
            if (!data || data.length == 0)
                return alert("No existen datos en esta version.");
            setComparer(data);
            data.reduce((total, obj) => obj.vrtot_origen + total, 0);
            data.reduce((total, obj) => obj.vrm2const_origen + total, 0);
            data.reduce((total, obj) => obj.vrm2vend_origen + total, 0);
            data.reduce((total, obj) => obj.incidencia_origen + total, 0);
            data.reduce((total, obj) => obj.vrtot_dest + total, 0);
            data.reduce((total, obj) => obj.vrm2const_dest + total, 0);
            data.reduce((total, obj) => obj.vrm2vend_dest + total, 0);
            data.reduce((total, obj) => obj.incidencia_dest + total, 0);
            setSubTotal({
                vrtot_origen: Math.trunc(data.reduce((total, obj) => obj.vrtot_origen + total, 0)),
                vrm2const_origen: Math.trunc(data.reduce((total, obj) => obj.vrm2const_origen + total, 0)),
                vrm2vend_origen: Math.trunc(data.reduce((total, obj) => obj.vrm2vend_origen + total, 0)),
                incidencia_origen: Math.trunc(data.reduce((total, obj) => obj.incidencia_origen * 100 + total, 0)),
                vrtot_dest: Math.trunc(data.reduce((total, obj) => obj.vrtot_dest + total, 0)),
                vrm2const_dest: Math.trunc(data.reduce((total, obj) => obj.vrm2const_dest + total, 0)),
                vrm2vend_dest: Math.trunc(data.reduce((total, obj) => obj.vrm2vend_dest + total)),
                incidencia_dest: Math.trunc(data.reduce((total, obj) => obj.incidencia_dest * 100 + total, 0))
            })
            setIsLoading(false);
        };
        if (budgetDestine)
            getBudgets(budget, budgetDestine).catch(error => {
                console.error('Error al obtener Comparer table:', error);
                setIsLoading(false);
            });
    }, [budgetDestine]);

    return (
        <>
            {!isLoading && itcomparer.length > 0 ? (
                itcomparer.map((comparar, index) => {
                    return (
                        <tr key={index} className="text-xs font-semibold">
                            <td className="table-content grow  w-[35%]" key={index + 1}>{comparar.nombre_origen ? comparar.nombre_origen : comparar.nombre_dest}</td>
                            <td className="w-4" key={index + 2}></td>
                            <td className="table-content text-center w-[11%]" key={index + 3}>0</td>
                            <td className="table-content text-center w-[11%]" key={index + 4}>0</td>
                            <td className="table-content text-center w-[11%]" key={index + 5}>{Math.trunc(comparar.vrtot_origen)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 6}>{Math.trunc(comparar.vrm2const_origen)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 7}>{Math.trunc(comparar.vrm2vend_origen)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 8}>{Math.trunc(comparar.incidencia_origen * 100)}</td>
                            <td className="w-4" key={index + 9}></td>
                            <td className="w-4" key={index + 10}></td>
                            <td className="w-4 gap-1" key={index + 11}></td>
                            <td className="table-content text-center w-[11%]" key={index + 12}></td>
                            <td className="table-content text-center w-[11%]" key={index + 13}></td>
                            <td className="table-content text-center w-[11%]" key={index + 14}>{Math.trunc(comparar.vrtot_dest)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 15}>{Math.trunc(comparar.vrm2const_dest)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 16}>{Math.trunc(comparar.vrm2vend_dest)}</td>
                            <td className="table-content text-center w-[11%]" key={index + 17}>{Math.trunc(comparar.incidencia_dest * 100)}</td>
                            <td className="w-4" key={index + 18}></td>
                            <td className="w-4" key={index + 19}></td>
                        </tr >
                    );
                })
            ) : (<tr><td colSpan="20" className="table-content w-[89%]">No existen costos Directos</td></tr>)}
            <tr key={"Subtotal"} className="text-xs font-semibold">
                <td className="table-header grow  " key={110 + 1}>{"Subtotal"}</td>
                <td className="w-4" key={110 + 2}></td>
                <td className="table-content text-center w-[11%]" key={110 + 3}>0</td>
                <td className="table-content text-center w-[11%]" key={110 + 4}>0</td>
                <td className="table-content text-center w-[11%]" key={110 + 5}>$ {subTotal ? (isNaN(subTotal.vrtot_origen) ? 0 : subTotal.vrtot_origen) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 6}>$ {subTotal ? (isNaN(subTotal.vrm2const_origen) ? 0 : subTotal.vrm2const_origen) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 7}>$ {subTotal ? (isNaN(subTotal.vrm2vend_origen) ? 0 : subTotal.vrm2vend_origen) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 8}>$ {subTotal ? (isNaN(subTotal.incidencia_origen) ? 0 : subTotal.incidencia_origen) : 0}</td>
                <td className="w-4" key={110 + 9}></td>
                <td className="w-4" key={110 + 10}></td>
                <td className="w-4 gap-1" key={110 + 11}></td>
                <td className="table-content text-center w-[11%]" key={110 + 12}></td>
                <td className="table-content text-center w-[11%]" key={110 + 13}></td>
                <td className="table-content text-center w-[11%]" key={110 + 14}>$ {subTotal ? (isNaN(subTotal.vrtot_dest) ? 0 : subTotal.vrtot_dest) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 15}>$ {subTotal ? (isNaN(subTotal.vrm2const_dest) ? 0 : subTotal.vrm2const_dest) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 16}>$ {subTotal ? (isNaN(subTotal.vrm2vend_dest) ? 0 : subTotal.vrm2vend_dest) : 0}</td>
                <td className="table-content text-center w-[11%]" key={110 + 17}>$ {subTotal ? (isNaN(subTotal.incidencia_dest) ? 0 : subTotal.incidencia_dest) : 0}</td>
                <td className="w-4" key={110 + 18}></td>
                <td className="w-4" key={110 + 19}></td>
            </tr >
        </>
    );
};
export default BudgetTableComparerBodyItem