import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const user_id = body.user;
  const proyecto_id = body.project;
  const { data, error } = await supabase
    .from("usuario_proyecto")
    .insert({ user_id, proyecto_id });
  if (error !== null) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ message: "Se agrego exitosamente" });
  }
}
