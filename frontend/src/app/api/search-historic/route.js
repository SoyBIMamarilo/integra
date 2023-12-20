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

export async function POST(req) {
  console.log("IN SEARCH HISTORIC");
  const body = await req.json();
  const descripcion = body.descripcion;
  const supabase = createRouteHandlerClient({ cookies }, options);
  const { data, error } = await supabase.rpc("busqueda_item", {
    // descripcion: "%placa%",
    descripcion,
  });
  console.log("data", data);
  return NextResponse.json(data);
}

// export async function GET(req) {
//   console.log("IN SEARCH HISTORIC");
//   const supabase = createRouteHandlerClient({ cookies }, options);
//   const { data, error } = await supabase.rpc("busqueda_item", {
//     descripcion: "%comunal%",
//   });

//   return NextResponse.json(data);
// }
