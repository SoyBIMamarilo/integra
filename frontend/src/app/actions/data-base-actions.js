export async function getIndexes() {
  const res = await fetch("http://localhost:8080/bases-datos/indicadores", {
    next: { tags: ["basesDatos"] },
  });
  const data = await res.json();
  return data;
}

export async function getCiudades() {
  const res = await fetch("http://localhost:8080/bases-datos/ciudades", {
    next: { tags: ["basesDatos"] },
  });
  const data = await res.json();

  return data;
}
