import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const id = body.id;
  console.log(body);
  const { data, error } = await supabase
    .from("plantilla_presupuesto")
    .delete()
    .eq("id", id);
  if (error !== null) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } else {
    return NextResponse.json(data);
  }
}

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const project = body.project;
  const items = body.items;
  const version = body.version;
  const date = body.date;
  const { data: tempV, error: tempE } = await supabase
    .from("plantilla_presupuesto")
    .insert({ proyecto_id: project, version, fecha_ejecucion: date })
    .select("id");

  if (tempV === null) {
    return NextResponse.json({ message: tempE.message }, { status: 500 });
  } else if (tempV.length === 0) {
    return NextResponse.json(
      { message: "No cuenta con los permisos para la creacion en esta tabla" },
      { status: 500 },
    );
  } else {
    const newViD = tempV[0].id;
    items.forEach((element) => {
      element.plantilla_presupuesto_id = newViD;
      element.proyecto_id = project;
    });
    const { data, error } = await supabase
      .from("presupuesto_historico")
      .insert(items);
    return NextResponse.json(data);
  }
}
