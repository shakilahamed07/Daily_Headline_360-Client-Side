import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import MostPupularArticle from "./MostPupularArticle";

const DashboardHome = () => {
  return (
    <div className="mx-auto mx-w-7xl">
      <div className="">
        <div className="lg:flex justify-center">
        <PieChart />
        <MostPupularArticle/>
        <BarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
