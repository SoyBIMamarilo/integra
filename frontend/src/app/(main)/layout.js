import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Layout = async ({ index, login }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  return !session
    ? login
    : session.user.role == "authenticated"
    ? index
    : login;
};

export default Layout;
