import Link from "next/link";

import { fetchProject } from "@/app/actions/project-actions";

import Information from "@/components/svg/information";

const Layout = async ({ create, children, params }) => {
  const project = await fetchProject(params.project);
  return (
    <>
      <div className="flex flex-row gap-2">
        <Link
          className="title-black	max-w-max shrink "
          href={`/projects/${project.id}`}
        >
          {project.nombre}
        </Link>
        {/* <Link href={`/projects/${project.id}/project-info`}> */}
        <Information />
        {/* </Link> */}
      </div>
      {create}
      {children}
    </>
  );
};

export default Layout;
