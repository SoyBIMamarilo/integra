import SideBar from "./SideBar";
import Separator from "@/components/separator";

const Layout = (props) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50 box-border flex  min-h-fit flex-row items-center  bg-blackA11 text-neutral-200 ">
          <h1 className=" text-WHITE grow pl-14	tracking-wide">INTEGRA</h1>
          <form action="/api/auth/logout" method="POST">
            <button className="m-2 rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-2.5 font-bold text-integra-text hover:bg-integra-background-strong">
              Salir
            </button>
          </form>
        </div>
        <div className="flex grow flex-row">
          <SideBar />
          <div>
            <Separator />
          </div>
          <div className="row z-40 box-border flex min-h-full grow flex-col p-4	">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
