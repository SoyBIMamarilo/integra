const Layout = ({ index, login }) => {
  const isLoggedIn = true;

  return isLoggedIn ? index : login;
};

export default Layout;
