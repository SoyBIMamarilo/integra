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
  // console.log("API PROJECTS REACHED!!!!");
  const supabase = createRouteHandlerClient({ cookies }, options);
  const body = await req.json();
  const nombre = body.nombre;
  const ciudad_id = body.ciudad;
  console.log("BEFORE POST PROYECTO");
  const { data, error } = await supabase
    .from("proyecto")
    .insert({ nombre, ciudad_id })
    .select();

  console.log(data);
  console.log(error);

  if (data === null) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } else if (data.length === 0) {
    return NextResponse.json(
      { message: "No cuenta con los permisos para la creacion en esta tabla" },
      { status: 500 },
    );
  } else {
    return NextResponse.json(data[0]);
  }
}
