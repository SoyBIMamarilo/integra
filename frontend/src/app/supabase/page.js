import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// this page will display with or without a user session
export default async function OptionalSession() {
  const supabase = createServerComponentClient(
    { cookies },
    {
      options: {
        db: {
          schema: "public",
        },
      },
    }
  );
  const { data, error } = await supabase.from("prueba").select("*");
  console.log(supabase);
  console.log(data);
  console.log(error);
  return <pre>{JSON.stringify({ data }, null, 2)}</pre>;
}
