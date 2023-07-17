import CiudadesCard from "./components/ciudades-card";

const fetchTest = async () => {
  const res = await fetch("http://localhost:8080/ciudades", {
    cache: "no-store",
  });
  const json = await res.json();
  console.log(json);
  return json;
};

const Home = async () => {
  const respuesta = await fetchTest();
  return (
    <div>
      {/* {respuesta.map((ciudad) => (
        <CiudadesCard nombre={ciudad.nombre} id={ciudad.id} />
      ))} */}
    </div>
  );
};

export default Home;
