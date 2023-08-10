export default async function Layout({ index, login }) {
  const isLoggedIn = true;

  return isLoggedIn ? index : login;
}
