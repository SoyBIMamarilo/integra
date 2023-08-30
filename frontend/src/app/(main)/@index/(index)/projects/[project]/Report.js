import GroupCard from "@/components/card/group-card";
import ReportTotal from "./ReportTotal";
import ReportConstruido from "./ReportConstruido";
import ReportVendible from "./ReporVendible";

const Report = ({ data }) => {
  return (
    <GroupCard title="Reportes" styles="grow">
      <div className="flex flex-row flex-wrap">
        <ReportTotal data={data} />
        <ReportConstruido data={data} categories={["valor_m2const"]} />
        <ReportVendible data={data} categories={["valor_m2vent"]} />
      </div>
    </GroupCard>
  );
};

export default Report;
