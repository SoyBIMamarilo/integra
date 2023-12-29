"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import Pencil from "@/components/svg/pencil";

export default function ProjectInfoFormData({
    project,
    ciudades,
    ciudad,
    clickHandler,
    changeHandler,
}) {
    const [editNombre, setEditNombre] = useState(false);
    const [editCiudad, setEditCiudad] = useState(false);
    const [editCodigo, setEditCodigo] = useState(false);
    const [editLinkMemoria, setEditLinkMemoria] = useState(false);

    const editNombreHandler = () => {
        setEditNombre((prevEdit) => !prevEdit);
        clickHandler("nombre");
    };

    const editCiudadHandler = () => {
        setEditCiudad((prevEdit) => !prevEdit);
        clickHandler("ciudad");
    };

    const editCodigoHandler = () => {
        setEditCodigo((prevEdit) => !prevEdit);
        clickHandler("codigo_oracle");
    };

    const editLinkMemoriaHandler = () => {
        setEditLinkMemoria((prevEdit) => !prevEdit);
        clickHandler("link_sharepoint");
    };

    const changeNombreHandler = (event) => {
        changeHandler(event.target.value, "nombre");
    };

    const changeCiudadHandler = (event) => {
        changeHandler(event.target.value, "ciudad");
    };

    const changeCodigoHandler = (event) => {
        changeHandler(event.target.value, "codigo_oracle");
    };

    const changeLinkMemoriaHandler = (event) => {
        changeHandler(event.target.value, "link_sharepoint");
    };

    const content = (label, defaultValue, editHandler, edit, type, onChangeHandler) => edit ? (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <p className="font-bold	">{label}</p>
            </div>
            <div className="flex flex-row">
                <input className="w-full border-none" type={type} name="nombre" defaultValue={defaultValue} onChange={onChangeHandler} />
                <div className="w-min">
                    <Pencil onClick={editHandler} />
                </div>
            </div>
        </div>
    ) : (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <p className="font-bold	">{label}</p>
            </div>
            <div className="flex flex-row">
                <div className="w-full border-none truncate">{defaultValue}</div>
                <Pencil onClick={editHandler} />
            </div>

        </div>
    );

    const contentCiudades = editCiudad ? (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <p className="font-bold	">Ciudad</p>
            </div>
            <div className="flex flex-row">
                <select className="w-full border-none" name="ciudad" defaultValue={project.ciudad_id} onChange={changeCiudadHandler}>
                    {ciudades.map((ciudad) => (
                        <option key={ciudad.id} value={ciudad.id}>
                            {ciudad.nombre}
                        </option>
                    ))}
                </select>
                <div className="w-min">
                    <Pencil onClick={editCiudadHandler} />
                </div>
            </div>
        </div>
    ) : (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <p className="font-bold	">Ciudad</p>
            </div>
            <div className="flex flex-row">
                <div className="w-full border-none truncate">{ciudad}</div>
                <Pencil onClick={editCiudadHandler} />
            </div>
        </div>
    )

    return (
        <>
            <div className="flex flex-col gap-3">
                {content("Nombre", project.nombre, editNombreHandler, editNombre, "text", changeNombreHandler)}
                {contentCiudades}
                {content("Codigo Oracle", project.codigo_oracle, editCodigoHandler, editCodigo, "number", changeCodigoHandler)}
                {content("Link memoria sharepoint", project.link_sharepoint, editLinkMemoriaHandler, editLinkMemoria, "text", changeLinkMemoriaHandler)}
            </div>
        </>
    );
}
