import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";

import { supabaseOptions } from "@/util/supabase";
import UsersTable from "./UsersTable";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: users, error: error } = await supabase
    .from("usuario_list")
    .select("*");

  return (
    <>
      <div className="mb-2 mt-1 text-2xl font-semibold">Usuarios</div>
      <div className="mb-4 mt-4 w-1/2">
        <UsersTable users={users} />
      </div>
      <Link href={`/user-admin/create-user`}>
        <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-2.5 font-bold text-integra-text hover:bg-integra-background-strong">
          Agregar
        </button>
      </Link>
    </>
  );
}
