import Link from "next/link";
import CiudadesCard from "@/components/card/ciudades-card";

const fetchCiudades = async () => {
  const res = await fetch("http://localhost:8080/bases-datos/ciudades", {
    cache: "no-store",
  });
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
        <div className="mb-8 text-3xl font-semibold">Ciudades</div>
        <div className="mb-8 flex basis-24 flex-row justify-start gap-y-3">
          {ciudades.map((ciudad) => (
            <CiudadesCard name={ciudad.nombre} id={ciudad.id} />
          ))}
        </div>
        <Link href="/bases-datos/login ">Crear Ciudad</Link>
      </div>
      <div className="mx-16 mt-8 w-1/2">
        <div className="mb-8 text-3xl font-semibold">Paquetes de trabajo</div>
        <div className="flex flex-row flex-wrap gap-y-3">
          {paquetesTrabajo.map((paquete) => (
            <CiudadesCard name={paquete.nombre} id={paquete.id} />
          ))}
        </div>
      </div>
    </>
  );
}
