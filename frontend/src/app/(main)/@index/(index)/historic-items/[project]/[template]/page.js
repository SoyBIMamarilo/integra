import TempTable from "./TempTable";

export default async function Page({ params }) {
  return <TempTable project={params.project} template={params.template}/>
}
