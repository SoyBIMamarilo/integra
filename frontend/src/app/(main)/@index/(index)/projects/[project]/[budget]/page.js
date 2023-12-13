import BudgetTable from "./BudgetTable";
import BudgetOptions from "./BudgetOptions";
import Date from "./Date";
import Tags from "./Tags";

export default async function Page({ params }) {
  return (
    <div className="mt-5 flex h-full flex-col justify-between rounded-lg border border-solid border-neutral-800 p-4 shadow-md ">
      <BudgetTable budget={params.budget} project={params.project} />
      <div className="mt-4 flex flex-row gap-2">
        <BudgetOptions budget={params.budget} project={params.project} />
        <div className=" border-r-4 border-integra-accent" />
        <Date budget={params.budget} />
        <div className=" border-r-4 border-integra-accent" />
        <Tags budget={params.budget} />
      </div>
    </div>
  );
}
