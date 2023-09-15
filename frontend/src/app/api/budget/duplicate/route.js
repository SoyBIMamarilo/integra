import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const version = body.version;
  const old_presupuesto_id = body.old_presupuesto_id;
  //   console.log(body);
  const { data, error } = await supabase
    .rpc("duplicate_presupuesto",{
        old_presupuesto_id,
        version
    })
  console.log(data);
  console.log(error);
  return NextResponse.json(data);
}