import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function middleware(req) {
  // return null;
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log(session);
  if (session && session.user.role == "authenticated") {
    console.log("AUTHENTICATED");
    return res;
  }
  console.log(requestUrl.host);
  redirect("/");
  // return NextResponse.redirect(new URL(requestUrl.host));
}

// export const config = {
//   matcher: "/api/(.*)",
// };
