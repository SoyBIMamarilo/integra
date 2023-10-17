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
                    console.log(user)
                    setProfile(user);
                } else {
                    console.error("debe iniciar session");
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
                        <Link href="https://accounts.autodesk.com/Authentication/LogOut"> <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" id="inlineFrameExample" title="Inline Frame Example" width="300" height="200">{profile.name}</button></Link>
                    ) : (<Link href="/api/aps/oauth/login"><button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" id="inlineFrameExample" title="Inline Frame Example" width="300" height="200" >login Aps</button></Link>)
                }
            </div>
        </>
    )
}
export default LoginAps;