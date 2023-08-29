import BudgetTableBodyItem from "./BudgetTableBodyItem";
// import BudgetTableBodyItem from "./BudgetItemTest";

const BudgetTableBody = ({ packages, itemsValues, packagesValues }) => {
  console.log("Budget Body");
  console.log(packagesValues);
  console.log(itemsValues);
  console.log(packages);
  return (
    <>
      {/* <BudgetTableBodyItem /> */}
      {packages.map((packageItem) => (
        <BudgetTableBodyItem
          paquete={packageItem}
          packageValue={
            packagesValues.items.filter(
              (it) => it.pqid == packageItem.paquete_trabajo_id
            )[0]
          }
          itemValue={itemsValues.items.filter(
            (it) => it.pqid == packageItem.paquete_trabajo_id
          )}
        />
      ))}
    </>
  );
};

export default BudgetTableBody;
