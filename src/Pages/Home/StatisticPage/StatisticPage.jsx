import React from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";

const StatisticPage = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // Count logic
  const totalUsers = users.length;
  const premiumUsers = users.filter(user => user.premiumToken).length;
  const normalUsers = users.filter(user => !user.premiumToken && user.role !== "admin").length;

  const stats = [
    { label: "Total Users", count: totalUsers, color: "bg-blue-400" },
    { label: "Normal Users", count: normalUsers, color: "bg-green-400" },
    { label: "Premium Users", count: premiumUsers, color: "bg-[#9076db]" },
  ];

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl text-white shadow-md p-8 text-center ${stat.color}`}
          >
            <h3 className="text-lg font-medium mb-2">{stat.label}</h3>
            <p className="text-4xl font-bold">
              {inView && <CountUp end={stat.count} duration={5} />}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticPage;
