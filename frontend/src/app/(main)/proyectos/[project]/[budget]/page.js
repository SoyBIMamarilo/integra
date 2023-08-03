export default function Page({ params }) {
  return (
    <div className="flex justify-center text-xs">
      <table className=" table-auto">
        <thread>
          <th className="h-16 w-48 border border-black	 bg-neutral-300 p-2 align-middle">
            Costo Directo
          </th>
          <th className="w-4"></th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            Area
          </th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            Costo M2 Subcapitulo
          </th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            Valor Total
          </th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            Valor Total M2 Area Construida
          </th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            Valor Total M2 Area Vendible
          </th>
          <th className="h-16 w-24 border border-black	 bg-neutral-300 p-2 align-middle">
            % Incidencia
          </th>
        </thread>
        <thread />
        <tbody>
          <td className="border border-neutral-900">Prueba</td>
        </tbody>
      </table>
    </div>
  );
}
