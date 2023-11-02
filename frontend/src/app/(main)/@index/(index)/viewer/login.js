"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LoginAps = ({ token }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const resp = await fetch('/api/aps/oauth/profile');
                if (resp.ok) {
                    const user = await resp.json();
                    setProfile(user);
                } else {
                    console.warn("refrescar la pagina");
                }
            } catch (err) {
                alert('Could not initialize the application. See console for more details.');
                console.error(err);
            }
        }
        getProfile().catch(error => {
            console.error('Error al obtener perfil:', error);
            //setIsLoading(false); // Marcar la carga como completada en caso de error
        });
    }, [token]);

    return (
        <>
            <div id="header">
                {/* <div><a href="https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=wQ5Roy3QFe2WbMCTd5b2634w17IuU1X6&redirect_uri=http://localhost:3000/api/aps/oauth/callback&scope=data:read">Click here to grant access to your data!</a></div> */}
                {
                    profile ? (
                        <div className="!ml-auto">
                            <div className="flex space-x-4">
                                <svg className="w-10 h-10 rounded-full bg-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <div className="font-medium dark:text-white">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{profile.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400"><Link href="/api/aps/oauth/logout"> <button className="w-14 h-4 text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-0 rounded-2" id="inlineFrameExample" title="Inline Frame Example">Salir</button></Link></div>
                                </div>
                            </div>
                        </div>
                    ) : (<Link href="/api/aps/oauth/login"><button className="w-14 h-4 text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-0 rounded-2" id="inlineFrameExample" title="Inline Frame Example">login Aps</button></Link>)
                }
            </div>
        </>
    )
}
export default LoginAps;