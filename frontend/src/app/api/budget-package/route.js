import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const paquete_trabajo_id = body.paquete_trabajo_id;
  const presupuesto_id = body.presupuesto_id;
  //   console.log(body);
  console.log(presupuesto_id);
  const { data, error } = await supabase
    .from("presupuesto_paquete_trabajo")
    .insert({ paquete_trabajo_id, presupuesto_id });
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
