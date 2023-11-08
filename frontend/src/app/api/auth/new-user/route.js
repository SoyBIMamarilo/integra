import { supabaseOptions } from "@/util/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(req) {
  const body = await req.json();
  let supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data:users , error: userError} = await supabase.auth.admin.listUsers()

  const xUser = users.users.filter((user)=>{return user.email === body.email})
  if (xUser.length !== 0) {
    return NextResponse.json({ message: "Este correo ya existe. Revisa tu bandeja de entrada" },{status:400});
  }
  else{
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(
      body.email
    );
    console.log(error)
    supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
    console.log(data.user.id);
    const { data: data2, error: error2 } = await supabase
      .from("usuario_rol")
      .insert({ user_id: data.user.id, rol: body.role });
    console.log(error2);
  
    return NextResponse.json({ message: "Correo enviado" });
  }
  
}
