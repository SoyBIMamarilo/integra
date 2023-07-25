import Link from "next/link";

export default function Layout(props) {
  return (
    <div>
      {/* <div className="z-100 absolute top-0 left-0 bg-gray-500 h-screen w-screen"></div>- */}
      <div className="h-[10vh] sticky top-0 flex flex-row items-center  bg-neutral-800 text-neutral-200 ">
        <div className="basis-1/6 text-center text-3xl font-semibold">
          INTEGRA
        </div>
        <div className="p-2 text-right text-2xl">Mi Perfil</div>
      </div>
      <div className="flex flex-row">
        <div className="h-[90vh] sticky top-[10vh] flex basis-1/6 flex-col items-center gap-3 bg-neutral-200 pt-12 text-lg text-neutral-600">
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
        <div className="basis-5/6 p-4">{props.children}</div>
      </div>
    </div>
  );
}
