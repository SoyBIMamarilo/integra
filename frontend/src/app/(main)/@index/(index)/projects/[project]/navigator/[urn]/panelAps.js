"use client";
import ViewerAps from "./viewerAps";
import LoginAps from "./login";
import { useState } from "react";

export default function PanelAps({ params }) {
    const plan3d = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlJmNG01T0pXUjRTM2xSZkhfZ0JOSGc_dmVyc2lvbj0z"
    const plan2d2 = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlRBTUdRMklxUUplQkNibERZZExRQ0E/dmVyc2lvbj0y"
    const plan2d = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnpldlFDaHZlUnZHeGc2LVU0NTZQWnc/dmVyc2lvbj02"
    console.log(params.urn)
    const [docUrn, setdocUrn] = useState(params.urn);
    const [api, setapi] = useState("");
    const [token, setToken] = useState("");
    const handlerDocUrn = (e, value) => {
        setdocUrn(e.target.value);
        setapi("AutodeskProduction");
    }
    const handleChangeToken = (access_token, expires_in) => {
        try {
            setToken(access_token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="p-0 bg-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 lg:gap-1">
                    <div className="p-0 bg-slate-200 rounded-md d-flex items-end justify-end"><LoginAps token={token} /></div>
                </div>
                <div className="grid grid-cols-1 h-[83vh] md:grid-cols-1 lg:grid-cols-1 gap-1 lg:gap-1">
                    <div className="p-0 bg-slate-200 rounded-md"><ViewerAps docUrn={docUrn} api={api} handleChangeToken={handleChangeToken} /></div>
                    {/* <div className="p-1 h-screen col-span-0 bg-cyan-400 rounded-md flex ">2</div> */}
                </div>
            </div>
        </>
    )
}