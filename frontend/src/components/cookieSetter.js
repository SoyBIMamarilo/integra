"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function setAuthCookies(access_token, refresh_token) {
  const cookieStore = cookies();
  cookieStore.set("access_token", access_token);
  cookieStore.set("refresh_token", refresh_token);
}

export async function getAuth(db_host, db_anon_key) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token").value;
  const refresh_token = cookieStore.get("refresh_token").value;
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  };

  if (access_token) {
    const supabase = createClient(db_host, db_anon_key,options)
    const genData = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    console.log(genData)
    const tokens = genData.data.session
    if (tokens.access_token !== access_token) {
      cookieStore.set("access_token", tokens.access_token);
      cookieStore.set("refresh_token", tokens.refresh_token);
    }
  }
  return cookieStore.get("access_token").value;
}
