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
      <div className="mx-16 w-1/2">
        <div className="font-semibold text-3xl mb-8">Ciudades</div>
        <div className="flex flex-row justify-start basis-24 gap-y-3 mb-8">
          {ciudades.map((ciudad) => (
            <CiudadesCard name={ciudad.nombre} id={ciudad.id} />
          ))}
        </div>
        <Link href="/bases-datos/login ">Crear Ciudad</Link>
      </div>
      <div className="mt-8 mx-16 w-1/2">
        <div className="font-semibold text-3xl mb-8">Paquetes de trabajo</div>
        <div className="flex flex-row flex-wrap gap-y-3">
          {paquetesTrabajo.map((paquete) => (
            <CiudadesCard name={paquete.nombre} id={paquete.id} />
          ))}
        </div>
      </div>
    </>
  );
}
