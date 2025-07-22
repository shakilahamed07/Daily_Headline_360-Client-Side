import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";

const BarChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: weeklyIncome = [], isLoading } = useQuery({
      queryKey: ["weeklyIncome"],
      queryFn: async () => {
        const res = await axiosSecure.get("/income/weekly");
        return res.data;
      },
    });
  
    if (isLoading) return <Loader />;
  
    // Chart data with formatted tooltip
    const chartData = [
      ["Date", "Income", { type: "string", role: "tooltip" }],
      ...weeklyIncome.map((item) => [
        item._id,
        item.totalIncome,
        `$${item.totalIncome.toFixed(2)}`, 
      ]),
    ];
  
    const chartOptions = {
      title: "Last 7 Days Income",
      legend: { position: "none" },
      hAxis: { title: "Date" },
      vAxis: {
        format: "$#,###", // Show $ on y-axis
      },
      chartArea: { width: "80%", height: "70%" },
      tooltip: { isHtml: false },
    };
  
    return (
      <div className=" mx-auto p-6">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  };

export default BarChart;
