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

export async function GET(req) {
  const supabase = createRouteHandlerClient({ cookies }, options);
  const { data, error } = await supabase.from("proyecto").select("*");
  return NextResponse.json(data);
}

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, options);
  const body = await req.json();
  const nombre = body.nombre;
  const ciudad_id = body.ciudad;
  console.log("BEFORE POST PROYECTO");
  const res = await supabase.from("proyecto").insert({ nombre, ciudad_id });
  const newProyect = await supabase
    .from("proyecto")
    .select()
    .eq("nombre", nombre);
  console.log("Created Project", newProyect);

  return NextResponse.json(newProyect.data[0]);
}
