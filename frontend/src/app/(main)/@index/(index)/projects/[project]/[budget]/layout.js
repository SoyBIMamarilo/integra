export default function Layout({ create, children, params }) {
  return (
    <>
      {create}
      <div className="mt-1 font-semibold">Versión: {params.budget}</div>
      {children}
    </>
  );
}
