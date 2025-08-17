import React from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";
import { FaCrown, FaUser, FaUsers } from "react-icons/fa";

const StatisticPage = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/statistics");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Users */}
        <div data-aos="zoom-in"
              data-aos-delay="50"
              data-aos-duration="600" className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500">
          <div className="flex justify-center mb-4">
            <FaUsers className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold">
            {inView && <CountUp end={stats.total} duration={4} />}+
          </p>
        </div>

        {/* Normal Users */}
        <div data-aos="zoom-in"
              data-aos-delay="50"
              data-aos-duration="900" className="rounded-2xl text-white shadow-md p-8 text-center bg-green-500">
          <div className="flex justify-center mb-4">
            <FaUser className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Normal Users</h3>
          <p className="text-4xl font-bold">
            {inView && <CountUp end={stats.normalUsers} duration={4} />}
          </p>
        </div>

        {/* Premium Users */}
        <div data-aos="zoom-in"
              data-aos-delay="50"
              data-aos-duration="1200" className="rounded-2xl text-white shadow-md p-8 text-center bg-purple-500">
          <div className="flex justify-center mb-4">
            <FaCrown className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Users</h3>
          <p className="text-4xl font-bold">
            {inView && <CountUp end={stats.premiumUsers} duration={4} />}
          </p>
        </div>

      </div>
    </div>
  );
};

export default StatisticPage;
