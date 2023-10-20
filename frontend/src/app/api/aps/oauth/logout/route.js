import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        request.cookies.delete("cookieAps");
        const cookieStore = cookies();
        cookieStore.delete("cookieAps");
        const url = request.nextUrl.clone();
        const response = NextResponse.redirect(
            url, { status: 302 }
        );
    } catch (err) {
        console.log("Api APS Op:Get", err);
    }

}