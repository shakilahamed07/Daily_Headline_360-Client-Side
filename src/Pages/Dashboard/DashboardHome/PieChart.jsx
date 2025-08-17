import React from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";

const PieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["articleStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/article-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // Convert to chart data format
  const chartData = [
    ["Publisher", "Percentage"],
    ...stats.map((item) => [item.publisher, parseFloat(item.percentage)]),
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-xl mt-10">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Article post by Publisher",
          is3D: true,
          backgroundColor: "#ffffff",
        }}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PieChart;
