import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import MostPupularArticle from "./MostPupularArticle";
import StatisticsForAdmin from "./StatisticsForAdmin";

const DashboardHome = () => {
  return (
    <div className="mx-auto mx-w-7xl">
      <div>
        <StatisticsForAdmin/>
      </div>

      <div className="space-y-10 mt-5">
        <PieChart />
        <MostPupularArticle />
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardHome;
