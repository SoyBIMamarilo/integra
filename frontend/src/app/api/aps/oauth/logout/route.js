import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        request.cookies.delete("cookieAps");
        return NextResponse.status(200);
    } catch (err) {
        console.log("Api APS Op:Get", err);
    }

}