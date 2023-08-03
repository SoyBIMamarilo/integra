export default function ({ children, params }) {
  return (
    <>
      <div className="ml-1 mt-1 font-semibold">Versión: {params.budget}</div>
      {children}
    </>
  );
}
