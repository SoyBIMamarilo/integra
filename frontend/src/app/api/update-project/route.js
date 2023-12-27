import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function PATCH(req, res) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const { data, error } = await supabase
    .from("proyecto")
    .update({
      nombre: body.nombre,
      ciudad_id: body.ciudad,
      codigo_oracle: body.codigo_oracle,
      link_sharepoint: body.link_sharepoint,
    })
    .eq("id", body.proyecto_id);
  if (error) {
    return NextResponse.json(
      { error: "No se encontró información del proyecto seleccionado" },
      { status: 403 }
    );
  }
  return NextResponse.json(data);
}
