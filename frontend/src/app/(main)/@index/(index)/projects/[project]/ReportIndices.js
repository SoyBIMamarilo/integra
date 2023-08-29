"use client";

import { Card, Title, BarChart, Subtitle, LineChart } from "@tremor/react";

const dataFormatter = (number) => {
  return (
    "$" +
    Intl.NumberFormat("us", {
      maximumFractionDigits: 0,
    })
      .format(number)
      .toString()
  );
};

const ReportIndices = ({ data }) => {
  console.log("Report Indices");
  console.log(data);
  return (
    <div className="w-1/2 grow p-6">
      <Card>
        <Title>Valores por m2 Presupuestos</Title>
        <BarChart
          className="mt-6 h-[500px] p-2"
          data={data}
          index="version"
          categories={["valor_m2const", "valor_m2vent"]}
          colors={["emerald", "blue", "amber", "rose", "indigo", "teal"]}
          valueFormatter={dataFormatter}
          yAxisWidth={70}
        />
      </Card>
    </div>
  );
};

export default ReportIndices;
