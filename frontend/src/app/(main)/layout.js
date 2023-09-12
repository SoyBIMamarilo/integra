import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Layout = async ({ index, login }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = session ? true : false;
  // console.log(session);
  // console.log(isLoggedIn);
  return isLoggedIn ? index : login;
};

export default Layout;
