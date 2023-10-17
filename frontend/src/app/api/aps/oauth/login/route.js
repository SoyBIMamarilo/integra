import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const APS = require('forge-apis');

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    try {
        const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;

        const internalAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES.split(","));
        const publicAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, PUBLIC_TOKEN_SCOPES.split(","));
        if (request.cookies.get('cookieAps'))
            request.cookies.delete('cookieAps');
        //let getAuthorizationUrl = () => internalAuthClient.generateAuthUrl();/*autodesk Fail*/
        let url = (`https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${APS_CLIENT_ID}&redirect_uri=${APS_CALLBACK_URL}&scope=${INTERNAL_TOKEN_SCOPES}`);
        return NextResponse.redirect(url);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 404 });
    }

}