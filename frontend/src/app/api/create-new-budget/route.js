import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const { data, error } = await supabase.rpc(
    "crear_nuevo_presupuesto_indicador",
    {
      version_presupuesto: body.version,
      proyecto_id: body.proyecto_id,
    }
  );
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
