import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="sticky flex h-[10%] flex-row items-center  bg-neutral-800 text-neutral-200 ">
        <div className="basis-1/6 text-center text-3xl font-semibold">
          INTEGRA
        </div>
        <div className="grow p-8 text-right text-2xl">Mi Perfil</div>
      </div>
      <div className="flex h-[90%] flex-row">
        <div className="flex h-full basis-1/6 flex-col items-center gap-3 bg-neutral-200 pt-12 text-lg text-neutral-600">
          <Link href="/proyectos" className="hover:text-neutral-900">
            Proyectos
          </Link>
          <Link href="/reportes" className="hover:text-neutral-900">
            Reportes
          </Link>
          <Link href="/bases-datos" className="hover:text-neutral-900">
            Bases de Datos
          </Link>
        </div>
        <div className="basis-5/6 p-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
