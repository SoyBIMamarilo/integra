import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const items = body.items;
  const { data, error } = await supabase
    .from("temp")
    .insert(items);
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}
