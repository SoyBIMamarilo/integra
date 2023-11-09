"use client";

import PackageFormChartItem from "./PackageFormChartItem";

const PackageFormChart = ({ title, paquetesStatus, changeHandler }) => {
  console.log(paquetesStatus);
  return (
    <div>
      <div className="font-bold">{title}</div>
      <div className="h-52 overflow-y-auto">
        {paquetesStatus.map((pq) => (
          <PackageFormChartItem
            key={pq.paquete_trabajo_id}
            packageItem={pq}
            changeHandler={changeHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageFormChart;
