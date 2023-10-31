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
  const projectId = params.project;
  const route = `/projects/${projectId}`;
  console.log(route);
  return (
    <>
      <div className="mb-2 mt-1 flex flex-row gap-2">
        <Link
          className="max-w-max shrink	text-2xl font-semibold "
          href={`${route}`}
          replace={true}
        >
          {project.nombre}
        </Link>
        <Link href={`/projects/${project.id}/parameters`}>
          <Information />
        </Link>
      </div>
      {create}
      {children}
    </>
  );
};

export default Layout;
