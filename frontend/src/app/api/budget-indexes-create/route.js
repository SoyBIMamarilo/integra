import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const { data, error } = await supabase.rpc("crear_presupuesto_indicador", {
    presupuesto: body.budget,
    insertar: body.indexes,
  });
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
