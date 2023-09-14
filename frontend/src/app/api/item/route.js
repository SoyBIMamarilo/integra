import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const descripcion_ajuste = body.descripcion_ajuste;
  const factor_ponderacion = body.factor_ponderacion;
  const indicador_destino_id = body.indicador_destino_id;
  const indicador_origen_id = body.indicador_origen_id;
  const referente_id = body.referente_id;
  const paquete_trabajo_id = body.paquete_trabajo_id;
  const presupuesto_id = body.presupuesto_id;
  const { data, error } = await supabase.from("item").insert({
    paquete_trabajo_id,
    presupuesto_id,
    referente_id,
    indicador_destino_id,
    indicador_origen_id,
    factor_ponderacion,
    descripcion_ajuste,
  });
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const id = body.item_id;
  const { data, error } = await supabase.from("item").delete().eq("id", id);
  console.log(error);
  return NextResponse.json(data);
}
