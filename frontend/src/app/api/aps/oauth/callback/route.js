import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const APS = require('forge-apis');

export async function GET(request, { params }) {
    try {
        const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;

        const internalAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES.split(","));
        const publicAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, PUBLIC_TOKEN_SCOPES.split(","));
        let code = request.nextUrl.searchParams.get('code');
        if (code) {
            const internalCredentials = await internalAuthClient.getToken(code);
            const publicCredentials = await publicAuthClient.refreshToken(internalCredentials);
            let cookieAps = {};
            const url = request.nextUrl.clone()
            url.pathname = '/viewer'
            const response = NextResponse.redirect(
                url, { status: 302 }
            );
            if (request.cookies.get('cookieAps'))
                request.cookies.delete('cookieAps');
            if (request.cookies.get('cookieAps'))
                cookieAps = request.cookies.get('cookieAps');
            else {
                cookieAps.public_token = publicCredentials.access_token;
                cookieAps.internal_token = internalCredentials.access_token;
                cookieAps.refresh_token = publicCredentials.refresh_token;
                cookieAps.expires_at = Date.now() + internalCredentials.expires_in * 1000;
                request.cookies.set("cookieAps", cookieAps);
                response.cookies.set("cookieAps", JSON.stringify(cookieAps), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV ? process.env.NODE_ENV : "production",
                });
            }
            return response;
        } else {
            return NextResponse.json({ error: [[err]] }, { status: 404 });
        }

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 404 });
    }

}