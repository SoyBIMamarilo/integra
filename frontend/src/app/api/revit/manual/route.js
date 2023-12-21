import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const tableName =
    body.type === "element" ? "elemento_manual" : "medicion_manual";
  const { data, error } = await supabase
    .from(tableName)
    .insert(body.data)
    .select();
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
