import { nf, nf_per } from "@/util/date-format";

const TableFooter = ({ table }) => {
  const vp1_total = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrtot;
  }, 0);
  const vp1_vend = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrm2vend;
  }, 0);
  const vp1_const = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_vrm2const;
  }, 0);
  const vp1_incidencia = table.reduce((accumulator, item) => {
    return accumulator + item.vp1_incidencia;
  }, 0);
  const vp2_total = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrtot;
  }, 0);
  const vp2_vend = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrm2vend;
  }, 0);
  const vp2_const = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_vrm2const;
  }, 0);
  const vp2_incidencia = table.reduce((accumulator, item) => {
    return accumulator + item.vp2_incidencia;
  }, 0);
  return (
    <>
      <tr className="h-2" />
      <tr >
        <td colSpan={1} className="table-content cursor-pointer">
          <div className="flex flex-row place-items-center px-2 font-bold bg-integra-background-strong">
            TOTAL CD CON I+R
          </div>
        </td>
        <td />
        <td className="text-center"></td>
        <td className="text-center"></td>
        <td className="table-content text-center text-base">{nf.format(vp1_total)}</td>
        <td className="table-content text-center text-base">{nf.format(vp1_const)}</td>
        <td className="table-content text-center text-base">{nf.format(vp1_vend)}</td>
        <td className="table-content text-center text-base">
          {nf_per.format(vp1_incidencia)}
        </td>
        <td />

        <td className="text-center"></td>
        <td className="text-center"></td>
        <td className="table-content text-center text-base">{nf.format(vp2_total)}</td>
        <td className="table-content text-center text-base">{nf.format(vp2_const)}</td>
        <td className="table-content text-center text-base">{nf.format(vp2_vend)}</td>
        <td className="table-content text-center text-base">
          {nf_per.format(vp2_incidencia)}
        </td>
      </tr>
    </>
  );
};

export default TableFooter;
