"use client";

import { Card, Title, BarChart, Subtitle, LineChart } from "@tremor/react";

const dataFormatter = (number) => {
  return (
    "$" +
    Intl.NumberFormat("us", {
      maximumFractionDigits: 0,
    })
      .format(number)
      .toString() +
    "MM"
  );
};

const ReportTotal = ({ data }) => {
  console.log("Report Indices");
  console.log(data);
  return (
    <div className="w-1/2 p-6">
      <Card>
        <Title>Valores totales Presupuestos (MM)</Title>
        <BarChart
          className="mt-6 h-[500px] p-2"
          data={data}
          index="version"
          categories={["valor_total_mm"]}
          description="Valor total versiones presupuestos"
          valueFormatter={dataFormatter}
          colors={["emerald", "blue", "amber", "rose", "indigo", "teal"]}
          yAxisWidth={80}
        />
      </Card>
    </div>
  );
};

export default ReportTotal;
