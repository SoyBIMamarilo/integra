import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import Information from "@/components/svg/information";

const Layout = async ({ create, children, params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data, error } = await supabase
    .from("proyecto")
    .select()
    .eq("id", params.project);
  const project = data[0];
  return (
    <>
      <div className="flex flex-row gap-2">
        <Link
          className="title-black	max-w-max shrink "
          href={`/projects/${project.id}`}
        >
          {project.nombre}
        </Link>
        <Link href={`/projects/${project.id}/project-info`}>
          <Information />
        </Link>
      </div>
      {create}
      {children}
    </>
  );
};

export default Layout;
