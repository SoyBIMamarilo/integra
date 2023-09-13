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

const ReportConstruido = ({ data, categories }) => {
  // console.log("Report Indices");
  // console.log(data);
  return (
    <div className="w-1/2 p-2">
      <Card className="bg-neutral-50">
        <Title>Valores por m2 Construido</Title>
        <BarChart
          className="mt-4 h-[250px]"
          data={data}
          index="version"
          categories={categories}
          colors={["sky", "emerald", "blue", "amber", "rose", "teal"]}
          valueFormatter={dataFormatter}
          yAxisWidth={100}
        />
      </Card>
    </div>
  );
};

export default ReportConstruido;
