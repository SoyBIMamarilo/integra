import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const APS = require('forge-apis');
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    let cookieStore = cookies();
    try {
        const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;

        const internalAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES.split(","));
        const publicAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, PUBLIC_TOKEN_SCOPES.split(","));
        let cookieAps = request.cookies.get('cookieAps');
        if (cookieAps) {
            let token = JSON.parse(cookieAps.value);
            if (token.expires_at > Date.now()) {
                let internalOAuthToken = {
                    access_token: token.internal_token,
                    expires_in: Math.round((token.expires_at - Date.now()) / 1000)
                };
                let publicOAuthToken = {
                    access_token: token.public_token,
                    expires_in: Math.round((token.expires_at - Date.now()) / 1000)
                };
                let profile = await new APS.UserProfileApi().getUserProfile(internalAuthClient, internalOAuthToken);
                profile = profile.body;
                return NextResponse.json(profile);
            }
        }
        return NextResponse.json({ error: "Debe Iniciar Session" }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ error: "Debe iniciar Session" }, { status: 401 });
    }

}