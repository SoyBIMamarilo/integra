import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const APS = require('forge-apis');
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    try {
        const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;

        const internalAuthClient = new APS.AuthClientThreeLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, INTERNAL_TOKEN_SCOPES.split(","));
        let cookieAps = request.cookies.get('cookieAps');
        if (cookieAps) {
            let token = JSON.parse(cookieAps.value);
            let internalOAuthToken = {
                access_token: token.internal_token,
                expires_in: Math.round((token.expires_at - Date.now()) / 1000)
            };
            const hubs = await new APS.HubsApi().getHubs(params.hub_id, internalAuthClient, internalOAuthToken);
            return NextResponse.json(hubs.body.data);
        }
    } catch (error) {
        console.log("Api APS Op:Get", err);
    }

}