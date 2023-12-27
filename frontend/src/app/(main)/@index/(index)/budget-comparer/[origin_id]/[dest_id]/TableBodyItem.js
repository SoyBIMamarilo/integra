import { nf, nf_per } from "@/util/date-format";

const TableBodyItem = ({ packageValue }) => {
  const packageFirst = packageValue[0];
  return (
    <tr>
      <td colSpan={1} className="table-content cursor-pointer">
        <div className="flex flex-row place-items-center px-2">
          {packageFirst.paquete_nombre}
        </div>
      </td>
      <td />
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp1_valor_parametro)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp1_indicador_valor)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp1_vrtot)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp1_vrm2const)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp1_vrm2vend)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf_per.format(packageFirst.vp1_incidencia)}
      </td>
      <td />
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp2_valor_parametro)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp2_indicador_valor)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp2_vrtot)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp2_vrm2const)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(packageFirst.vp2_vrm2vend)}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf_per.format(packageFirst.vp2_incidencia)}
      </td>
      <td />
      <td className="table-content px-1 text-center text-base">
        {nf.format(Math.abs(packageFirst.vp1_vrtot - packageFirst.vp2_vrtot))}
      </td>
      <td className="table-content px-1 text-center text-base">
        {nf.format(
          Math.abs(packageFirst.vp2_vrm2const - packageFirst.vp1_vrm2const)
        )}
      </td>
    </tr>
  );
};
export default TableBodyItem;
