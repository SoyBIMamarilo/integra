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
  // console.log(session);
  if (session && session.user.role == "authenticated") {
    console.log("AUTHENTICATED");
    return res;
  }
  // console.log("Middleware");
  // console.log(req);
  // return redirect("/");
  // return NextResponse.redirect(new URL(requestUrl.origin));
}

// export const config = {
//   matcher: "/api/(.*)",
// };
