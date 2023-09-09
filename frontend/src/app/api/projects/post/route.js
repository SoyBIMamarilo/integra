import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const body = await request.json();
  const nombre = body.nombre;
  const ciudad = body.ciudad;
  // console.log(ciudad);
  // console.log(nombre);
  // return NextResponse.json({ message: "Bien!!!" });
  console.log("BEFORE POST PROYECTO");
  const res = await fetch("http://localhost:8080/proyectos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      ciudad,
    }),
    cache: "no-store",
  });
  revalidateTag("proyectos");
  const data = await res.json();

  return NextResponse.json(data);
}
