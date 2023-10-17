import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const APS = require('forge-apis');
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    try {
        const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;

        const internalAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES.split(","));
        const publicAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, PUBLIC_TOKEN_SCOPES.split(","));

        let cookieAps = {};
        if (request.cookies.get('cookieAps')) {
            cookieAps = JSON.parse(request.cookies.get('cookieAps').value);
            if (cookieAps.expires_at < Date.now()) {
                const internalCredentials = await internalAuthClient.refreshToken({ refresh_token: cookieAps.refresh_token });
                const publicCredentials = await publicAuthClient.refreshToken(internalCredentials);
                cookieAps.public_token = publicCredentials.access_token;
                cookieAps.internal_token = internalCredentials.access_token;
                cookieAps.refresh_token = publicCredentials.refresh_token;
                cookieAps.expires_at = Date.now() + internalCredentials.expires_in * 1000;
                if (request.cookies.get('cookieAps'))
                    request.cookies.delete('cookieAps');
                const cookieStore = cookies();
                cookieStore.set("cookieAps", JSON.stringify(cookieAps), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV ? process.env.NODE_ENV : "production",
                });
            }
            let publicOAuthToken = {
                access_token: cookieAps.public_token,
                expires_in: Math.round((cookieAps.expires_at - Date.now()) / 1000)
            };
            //return response.json(publicOAuthToken);
            if (request.cookies.get('cookieAps'))
                request.cookies.delete('cookieAps');
            const cookieStore = cookies();
            cookieStore.set("cookieAps", JSON.stringify(cookieAps), {
                httpOnly: true,
                secure: process.env.NODE_ENV ? process.env.NODE_ENV : "production",
            });
            return NextResponse.json(publicOAuthToken);
            // return new NextResponse(JSON.stringify(publicOAuthToken), {
            //     status: 200,
            //     headers: { "Set-Cookie": `${JSON.stringify(cookieAps)}; sameSite=strict; httpOnly=true; maxAge=60*60*24` },
            // });
        }
    } catch (err) {
        return NextResponse.json({ error: "Debe iniciar Session" }, { status: 401 });
    }

}