import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="sticky flex flex-row h-[10%] items-center bg-neutral-800  text-neutral-200">
        <div className="text-3xl font-semibold basis-1/6 text-center">
          INTEGRA
        </div>
        <div
          className="text-2xl p-8 grow 
        
        text-right"
        >
          Mi Perfil
        </div>
      </div>
      <div className="h-[90%] flex flex-row">
        <div className="h-full bg-neutral-200 basis-1/6 flex flex-col justify-center items-center text-xl text-neutral-600 gap-10">
          <Link href="/proyectos" className="hover:text-neutral-900">
            Proyectos
          </Link>
          <Link href="/reportes" className="hover:text-neutral-900">
            Reportes
          </Link>
          <Link href="/bases-datos" className="hover:text-neutral-900">
            Bases de Datos
          </Link>
          {/* <div class="w-3 border-b border-gray-300"></div> */}
        </div>
        <div className="basis-5/6 p-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
