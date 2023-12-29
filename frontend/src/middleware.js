import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function middleware(req) {
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session && session.user.role == "authenticated") {
    return res;
  }
}

export const config = {
  matcher: ["/projects"],
};
