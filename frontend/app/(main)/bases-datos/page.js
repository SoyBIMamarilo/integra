import Link from "next/link";
import CiudadesCard from "../components/ciudades-card";

const fetchCiudades = async () => {
  const res = await fetch("http://localhost:8080/bases-datos/ciudades", {
    cache: "no-store",
  });
  const json = await res.json();
  // console.log(json);
  return json;
};

const fetchPaquetesTrabajo = async () => {
  const res = await fetch(
    "http://localhost:8080/bases-datos/paquetes-trabajo",
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  // console.log(json);
  return json;
};

export default async function BasesDatos() {
  const ciudadesData = fetchCiudades();
  const paquetesTrabajoData = fetchPaquetesTrabajo();

  const [ciudades, paquetesTrabajo] = await Promise.all([
    ciudadesData,
    paquetesTrabajoData,
  ]);
  return (
    <>
      <div>
        <div>Ciudades</div>
        {ciudades.map((ciudad) => (
          <div>{ciudad.nombre}</div>
        ))}
      </div>
      <Link href="/bases-datos/login">Crear Ciudad</Link>
      <div>
        <div>Paquetes de trabajo</div>
        {paquetesTrabajo.map((ciudad) => (
          <div>{ciudad.nombre}</div>
        ))}
      </div>
    </>
  );
}
