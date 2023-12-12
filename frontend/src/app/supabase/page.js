export default async function OptionalSession(params) {
  const res = await fetch("localhost:3000/api/search-historic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const open = await res.json();
  console.log("TEST SUPABASE");
  return <div>Prueba Tailwind</div>;
}
