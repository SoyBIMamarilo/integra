import BudgetTableBodyItem from "./BudgetTableBodyItem";

const BudgetTableBody = ({ paquete, items, budget }) => {
  return (
    <>
      {paquete.map((packageItem) => (
        <BudgetTableBodyItem
          budget={budget}
          paquete={packageItem}
          items={items.items.filter(
            (it) => it.pqid == packageItem.paquete_trabajo_id
          )}
          packageItem={
            items.items.filter(
              (it) => it.pqid == packageItem.paquete_trabajo_id
            )[0]
          }
        />
      ))}
    </>
  );
};

export default BudgetTableBody;
