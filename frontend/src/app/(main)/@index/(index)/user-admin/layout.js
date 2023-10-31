const Layout = (props) => {
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
};

export default Layout;
