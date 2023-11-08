import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });
  const token_hash = requestUrl.searchParams.get("token_hash");
  const next = requestUrl.searchParams.get("next");
  const type = requestUrl.searchParams.get("type");
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    await supabase.auth.verifyOtp({ token_hash, type });
  }

  return NextResponse.redirect(requestUrl.origin + next, {
    status: 301,
  });
}

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const supabase = createRouteHandlerClient({ cookies });
  console.log("Recover");
  //   console.log(supabase);
  await supabase.auth.resetPasswordForEmail(email);

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
  // return NextResponse.redirect("/projects");
}

export async function PATCH(request) {
  const { newPassword } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const response = {
    message:
      "Ha ocurrido un problema, verifica que el link de restauracion no este vencido",
  };
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const responseS = await supabase.auth.updateUser({ password: newPassword });
    if (responseS.error) {
      response.message =
        "Ha ocurrido un problema, no se ha podido actualizar la sesion";
    } else {
      response.message = "Cambio de contraseña exitoso!";
    }
  }
  return NextResponse.json(response);
}
