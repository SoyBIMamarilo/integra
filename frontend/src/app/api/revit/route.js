import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const { data, error } = await supabase
    .from("cbs_cantidades_rvt")
    .insert(body)
    .select();
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}

export async function GET(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const { data, error } = await supabase.from("cbs_cantidades_rvt").select();
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
