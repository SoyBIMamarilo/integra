import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function PATCH(req, res) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const projectData = body.prueba;
  const projectDataBody = {};

  projectData.forEach((field) => {
    let [key, value] = Object.entries(field)[0];
    projectDataBody[key] = value;
  });
  const { data, error } = await supabase
    .from("proyecto")
    .update(projectDataBody)
    .eq("id", body.proyecto_id);
  if (error) {
    return NextResponse.json(
      { error: "No se encontró información del proyecto seleccionado" },
      { status: 403 }
    );
  }
  return NextResponse.json(data);
}
