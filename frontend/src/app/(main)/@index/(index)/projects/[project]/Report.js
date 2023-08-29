import GroupCard from "@/components/card/group-card";
import ReportIndices from "./ReportIndices";
import ReportTotal from "./ReportTotal";

const Report = ({ data }) => {
  return (
    <GroupCard title="Reportes" styles="grow">
      <div className="flex grow flex-row">
        <ReportTotal data={data} />
        <ReportIndices data={data} />
      </div>
    </GroupCard>
  );
};

export default Report;
