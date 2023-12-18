import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const { data, error } = await supabase.rpc("listado_todos_presupuestos");

  return NextResponse.json({ tags: [...data] }, { status: 200 });
}
