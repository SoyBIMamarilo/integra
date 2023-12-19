import { nf, nf_per } from "@/util/date-format";

const TableBodyItem = ({ packageValue }) => {
  const packageFirst = packageValue[0];
  return (
    <tr className="font-bold">
      <td colSpan={1} className="table-content cursor-pointer">
        <div className="flex flex-row place-items-center px-2">
          {packageFirst.paquete_nombre}
        </div>
      </td>
      <td />
      <td className="table-content text-center"></td>
      <td className="table-content text-center"></td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp1_vrtot)}
      </td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp1_vrm2const)}
      </td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp1_vrm2vend)}
      </td>
      <td className="table-content text-center">
        {nf_per.format(packageFirst.vp1_incidencia)}
      </td>
      <td />
      <td className="table-content text-center"></td>
      <td className="table-content text-center"></td>
      <td className="table-content text-center"></td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp2_vrtot)}
      </td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp2_vrm2const)}
      </td>
      <td className="table-content text-center">
        {nf.format(packageFirst.vp2_vrm2vend)}
      </td>
      <td className="table-content text-center">
        {nf_per.format(packageFirst.vp2_incidencia)}
      </td>
    </tr>
  );
};
export default TableBodyItem;
