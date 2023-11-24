import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  console.log(body);
  const { data, error } = await supabase.from("item").insert(body);
  if (error) {
    return NextResponse.json(
      { error: "Algún parametro se encuentra en 0" },
      { status: 403 }
    );
  }
  return NextResponse.json({ status: 201 });
}
