import Link from "next/link";

const Layout = (props) => {
  return (
    <>
      <div>
        <div className="sticky top-0 z-50 box-border flex h-[10vh] flex-row items-center  bg-neutral-800 text-neutral-200 ">
          <div className="basis-1/6 text-center text-3xl font-semibold">
            INTEGRA
          </div>
          <div className="p-2 text-right text-2xl">Mi Perfil</div>
        </div>
        <div className="flex flex-row">
          <div className="sticky top-[10vh]  flex h-[90vh] basis-1/6 flex-col items-start gap-3 bg-neutral-200 pl-10 pt-12 text-neutral-600">
            <Link href="/projects" className="hover:text-neutral-900">
              Proyectos
            </Link>
            <Link href="/reports" className="hover:text-neutral-900">
              Reportes
            </Link>
            <Link href="/data-bases" className="hover:text-neutral-900">
              Bases de Datos
            </Link>
          </div>
          <div className="row z-40 box-border flex min-h-full basis-5/6 flex-col p-4	">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
