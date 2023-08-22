import Link from "next/link";

import { fetchProject } from "@/app/actions/project-actions";

const Layout = async ({ create, children, params }) => {
  const project = await fetchProject(params.project);
  return (
    <>
      <Link
        className="title-black	max-w-max shrink "
        href={`/projects/${project.id}`}
      >
        {project.nombre}
      </Link>
      {create}
      {children}
    </>
  );
};

export default Layout;
