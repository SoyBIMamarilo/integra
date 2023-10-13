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
  if (data === null) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } else if (data.length === 0) {
    return NextResponse.json(
      { message: "No cuenta con los permisos para la creacion en esta tabla" },
      { status: 500 }
    );
  } else {
    return NextResponse.json(data);
  }
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

export async function PUT(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const id = body.id;
  const { data, error } = await supabase
    .from("presupuesto")
    .select("bloqueado")
    .eq("id", id);
  const block = !data[0].bloqueado;
  const { data: data2, error: error2 } = await supabase
    .from("presupuesto")
    .update({ bloqueado: block })
    .eq("id", id)
    .select();

  const returnData = { message: "Se bloqueo con exito" };
  const status = { status: 200 };
  if (data2.length == 0) {
    returnData.message = "No cuenta con los permisos para esta acción";
    status.status = 500;
  }
  return NextResponse.json(returnData, status);
}
