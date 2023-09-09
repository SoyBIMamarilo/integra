import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const body = await request.json();
  const project_id = body.project_id;
  const indices = body.indices;
  console.log(body);

  const res = await fetch("http://localhost:8080/proyectos/indices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id,
      indices,
    }),
    cache: "no-store",
  });
  revalidateTag("proyectos");
  const data = await res.json();
  console.log(data);
  return NextResponse.json(data);
}
