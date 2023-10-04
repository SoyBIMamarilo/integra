
import BudgetTablComparerHeader from "./BudgetTableComparerHeader";
import BudgetControls from "./BudgetControls"
const BudgetTableComparer = async ({ params }) => {
  let { project,budget } = params;
  let rootApi = process.env.ROOT_URL ? process.env.ROOT_URL : "http://localhost:3000";

  return (
    <>

      <div className="flex">
        <div >  
        <BudgetControls />       
          <BudgetTablComparerHeader />
        </div>
        <div>
          <BudgetTablComparerHeader />         
        </div>
      </div>
    </>

  );
};
export default BudgetTableComparer;
