import SideBar from "./SideBar";
import Separator from "@/components/separator";
import Logout from "./Logout";

const Layout = (props) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50 box-border flex  min-h-fit flex-row items-center  bg-blackA11 text-neutral-200 ">
          <h1 className=" text-WHITE grow pl-14	tracking-wide">INTEGRA</h1>
          <form action="/api/auth/logout" method="POST">
            <Logout />
          </form>
        </div>
        <div className="flex max-w-full grow flex-row">
          <SideBar />
          <div>
            <Separator />
          </div>
          <div className="row z-40 box-border flex min-h-full  grow flex-col p-4	">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
