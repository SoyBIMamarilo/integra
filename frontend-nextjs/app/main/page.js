import Image from "next/image";

const fetchTest = async () => {
  const res = await fetch("http://localhost:5000/test", { cache: "no-store" });
  const json = await res.json();
  console.log(json);
  return json;
};

const Home = async () => {
  const respuesta = fetchTest();
  return <div></div>;
};

export default Home;
