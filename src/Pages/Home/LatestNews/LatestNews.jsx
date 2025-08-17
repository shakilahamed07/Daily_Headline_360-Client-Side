import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const LatestNews = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handelViwDetails = async (id) => {
    navigate(`/article/${id}`);
    if (user?.email) {
      await axiosSecure.patch(`/articles/view-Increase/${id}`);
    }
  };

  // latest news
  const { data: latestNews = [], isLoading } = useQuery({
    queryKey: ["latestNews"],
    queryFn: async () => {
      const res = await axios.get(
        "https://daily-headline-360-server-side.vercel.app/latest/articles"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">⏳ Loading news...</p>;

  return (
    <section className="mt-20 mb-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 ">📰 Latest News</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {latestNews.map((news) => (
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              key={news._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(news.posted_date).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3">
                  {news.description}
                </p>
                <button
                  onClick={() => handelViwDetails(news._id)}
                  className="px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-100 transition "
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
