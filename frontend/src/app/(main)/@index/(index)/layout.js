import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50 box-border flex  min-h-fit flex-row items-center  bg-neutral-800 text-neutral-200 ">
          <h1 className="bg-colors grow pl-14 tracking-wide	">INTEGRA</h1>
          {/* <div className="p-2 text-right text-2xl">Mi Perfil</div> */}
          <form action="/api/auth/logout" method="POST">
            <button className="button-main text-integra-text">Salir</button>
          </form>
        </div>
        <div className="flex grow flex-row">
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
