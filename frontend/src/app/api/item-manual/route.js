import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const descripcion = body.descripcion;
  const nombre = body.nombre;
  const valor = body.valor;
  const paquete_trabajo_id = body.paquete_trabajo_id;
  const presupuesto_id = body.presupuesto_id;

  const { data, error } = await supabase.from("item_manual").insert({
    paquete_trabajo_id,
    presupuesto_id,
    descripcion,
    nombre,
    valor,
  });
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const id = body.item_id;
  const { data, error } = await supabase
    .from("item_manual")
    .delete()
    .eq("id", id);
  console.log(error);
  return NextResponse.json(data);
}
