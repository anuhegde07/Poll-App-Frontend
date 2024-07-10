import React from "react";
import { Chart } from "react-google-charts";

export function Piechart({option}) {
  return (
    <div className="piechart">
    <Chart
      chartType="PieChart"
      data={option.data}
      options={option.title}
      width={"100%"}
      height={"100%"}
      
    />
    </div>
  );
}
