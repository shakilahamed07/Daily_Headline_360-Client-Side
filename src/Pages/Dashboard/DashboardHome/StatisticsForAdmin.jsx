import React from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";
import { FaCrown, FaUsers } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";
import { IoCloudDone } from "react-icons/io5";

const StatisticsForAdmin = () => {
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

  const { data: totalArticle = 0 } = useQuery({
    queryKey: ["totalArticle"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved/articles/count-page");
      return res.data;
    },
  });

  const { data: totalPublishers = [] } = useQuery({
    queryKey: ["totalPublishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  console.log(totalArticle);
  if (isLoading) return <Loader />;

  return (
    <>
      <div ref={ref} className="mt-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {/* Total Users */}
          <div
            data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="500"
            className="rounded-2xl text-white shadow-md p-8 text-center bg-blue-500"
          >
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-4xl font-bold">
              {inView && <CountUp end={stats.total} duration={4} />}+
            </p>
          </div>

          {/* Premium Users */}
          <div
            data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="700"
            className="rounded-2xl text-white shadow-md p-8 text-center bg-purple-500"
          >
            <div className="flex justify-center mb-4">
              <FaCrown className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Users</h3>
            <p className="text-4xl font-bold">
              {inView && <CountUp end={stats.premiumUsers} duration={4} />}
            </p>
          </div>

          {/* Approved Articles */}
          <div
            data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="900"
            className="rounded-2xl text-white shadow-md p-8 text-center bg-green-500"
          >
            <div className="flex justify-center mb-4">
              <IoCloudDone className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Approved Articles</h3>
            <p className="text-4xl font-bold">
              {inView && <CountUp end={totalArticle.count} duration={4} />}
            </p>
          </div>

          {/* Total Publishers */}
          <div
            data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            className="rounded-2xl text-white shadow-md p-8 text-center bg-emerald-600"
          >
            <div className="flex justify-center mb-4">
              <MdOutlinePublic className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Publishers</h3>
            <p className="text-4xl font-bold">
              {inView && <CountUp end={totalPublishers.length} duration={3} />}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsForAdmin;
