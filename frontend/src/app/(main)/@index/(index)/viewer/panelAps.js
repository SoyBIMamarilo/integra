
"use client";
import ViewerAps from "./viewerAps";
import LoginAps from "./login";
import { useEffect, useState } from "react";

export default function PanelAps({ params }) {
    const [docUrn, setdocUrn] = useState("dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnFHUThjNXJ2VGNtLVV5dEtKQmFHaGc/dmVyc2lvbj0z");
    const [api, setapi] = useState("");
    const [token, setToken] = useState("");
    const handlerDocUrn = (e, value) => {
        setdocUrn(e.target.value);
        setapi("AutodeskProduction");
    }
    const handleChangeToken = (access_token, expires_in) => {
        try {
            console.warn(access_token);
            setToken(access_token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="p-0 bg-amber-300">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 lg:gap-1">
                    <div className="p-1 bg-cyan-400 rounded-md flex items-center justify-center"><LoginAps token={token} /></div>
                </div>
                <div className="grid grid-cols-4 h-screen md:grid-cols-4 lg:grid-cols-4 gap-1 lg:gap-1">
                    <div className="p-1 h-screen col-span-4 bg-cyan-400 rounded-md flex"><ViewerAps docUrn={docUrn} api={api} handleChangeToken={handleChangeToken} /></div>
                    {/* <div className="p-1 h-screen col-span-0 bg-cyan-400 rounded-md flex ">2</div> */}
                </div>
            </div>
        </>
    )
}