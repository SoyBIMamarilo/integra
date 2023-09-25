import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const version = body.version;
  const proyecto_id = body.proyecto_id;
  //   console.log(body);
  const { data, error } = await supabase
    .from("presupuesto")
    .insert({ version, proyecto_id });
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const id = body.id;
  console.log(body);
  const { data, error } = await supabase
    .from("presupuesto")
    .delete()
    .eq("id", id);
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
