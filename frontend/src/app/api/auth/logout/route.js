import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  return new Response(null, {
    status: 204,
  });
}
