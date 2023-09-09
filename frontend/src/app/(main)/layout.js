const Layout = ({ index, login }) => {
  const isLoggedIn = false;

  return isLoggedIn ? index : login;
};

export default Layout;
