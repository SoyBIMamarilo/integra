"use client";

const PackageFormChartItem = ({ packageItem, changeHandler }) => {
  const clickHandler = () => {
    // console.log(packageItem);
    changeHandler(packageItem.paquete_trabajo_id);
  };
  return (
    <div
      className="m-1 border border-integra-text bg-gray3 p-1 hover:cursor-pointer"
      onClick={clickHandler}
    >
      {packageItem.nombre}
    </div>
  );
};

export default PackageFormChartItem;
