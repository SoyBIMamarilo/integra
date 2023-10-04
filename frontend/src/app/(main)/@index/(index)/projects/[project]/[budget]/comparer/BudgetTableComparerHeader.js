const BudgetTableComparerHeader = () => {
    return (
        <>
        <div className="flex grid-cols-7 md:grid-cols-7 lg:grid-cols-7">
          <div className="table-header col-span-1 items-center w-auto justify-center">Costo Directo</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">Area</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">Costo M2 Subcapitulo</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">Valor Total</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">Valor Total M2 Area Construida</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">Valor Total M2 Area Vendible</div>
          <div className="table-header col-span-1 items-center w-auto justify-center">% Incidencia</div>
        </div>
      </>
    );
  };
  
  export default BudgetTableComparerHeader;