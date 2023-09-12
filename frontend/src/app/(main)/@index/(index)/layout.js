import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <>
      <div>
        <div className="sticky top-0 z-50 box-border flex h-[10vh] flex-row items-center  bg-neutral-800 text-neutral-200 ">
          <div className="basis-1/6 text-center text-3xl font-semibold">
            INTEGRA
          </div>
          <div className="p-2 text-right text-2xl">Mi Perfil</div>
          <form action="/api/auth/logout" method="POST">
            <button className="p-2 text-right text-2xl">Salir</button>
          </form>
        </div>
        <div className="flex flex-row">
          <SideBar />
          <div className="row z-40 box-border flex min-h-full basis-5/6 flex-col p-4	">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
