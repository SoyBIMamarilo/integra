import GroupCard from "@/components/card/group-card";
import ReportTotal from "./ReportTotal";
import ReportConstruido from "./ReportConstruido";
import ReportVendible from "./ReporVendible";

const Report = ({ total, m2const, m2vend }) => {
  console.log(total);
  console.log(m2const);
  console.log(m2vend);
  return (
    <GroupCard title="Reportes" styles="grow z-0">
      <div className="z-0 flex flex-row flex-wrap">
        <ReportTotal data={total} />
        <ReportConstruido data={m2const} categories={["m2const"]} />
        <ReportVendible data={m2vend} categories={["m2vend"]} />
      </div>
    </GroupCard>
  );
};

export default Report;
