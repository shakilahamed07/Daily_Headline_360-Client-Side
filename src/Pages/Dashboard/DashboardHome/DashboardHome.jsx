import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import MostPupularArticle from "./MostPupularArticle";
import { FaUsers } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="mx-auto mx-w-7xl">

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">
              50+
            </p>
          </div>

          <div className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">
              50+
            </p>
          </div>

          <div className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">
              50+
            </p>
          </div>

          <div className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">
              50+
            </p>
          </div>
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
