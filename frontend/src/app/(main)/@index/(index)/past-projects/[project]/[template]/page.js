import TempTable from "./TempTable";
import TestTable from "./nn";

export default async function Page({ params }) {
  return <TempTable project={params.project} template={params.template} />;
}
