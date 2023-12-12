import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const options = {
  options: {
    db: {
      schema: "presupuesto",
    },
  },
};

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  const supabase = createRouteHandlerClient({ cookies }, options);
  console.log("indexes", supabase);
  const { data, error } = await supabase.from("indicador").select("*");
  console.log("data", data);
  console.log("error", error);
  return NextResponse.json(data);
}

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, options);
  const body = await req.json();
  const indicador_id = body.indicador_id;
  const proyecto_id = body.proyecto_id;
  const valor = body.valor;
  const res = await supabase
    .from("proyecto_indicador")
    .insert({ indicador_id, proyecto_id, valor });
  return NextResponse.json(res);
}
