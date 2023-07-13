const Layout = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-6 h-screen">
        <div className="h-screen bg-neutral-800">
          <h2 className=" text-neutral-200">Integra</h2>
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </>
  );
};

export default Layout;
