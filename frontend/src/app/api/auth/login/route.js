import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = createRouteHandlerClient({ cookies });
  console.log("LOGGING IN");
  //   console.log(supabase);
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.log("FAILED");
    console.log(requestUrl);
    console.log(requestUrl.host);
    return NextResponse.json(
      { error: "Falla autenticacion" },
      {
        status: 401,
      },
    );
  }
  return NextResponse.redirect(new URL("/projects", requestUrl.host), {
    status: 301,
  });
}
