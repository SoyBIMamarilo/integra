export default function ({ create, children, params }) {
  return (
    <>
      {create}
      <div className="ml-1 mt-1 font-semibold">Versión: {params.budget}</div>
      {children}
    </>
  );
}
