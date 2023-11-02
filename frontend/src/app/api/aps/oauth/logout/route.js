import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    try {
        request.cookies.delete("cookieAps");
        const cookieStore = cookies();
        cookieStore.delete("cookieAps");
        const url = request.nextUrl.origin + "/viewer";
        const response = NextResponse.redirect(
            url, { status: 302 }
        );
        return response;
    } catch (err) {
        console.log("Api APS Op:Get", err);
    }

}