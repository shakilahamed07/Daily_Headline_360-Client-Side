import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Share/Loader";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const { data: premiumArticles = [], isLoading } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-articles`);
      return res.data;
    },
  });
  console.log(premiumArticles);

  const detailsPage = async (id) => {
    await axiosSecure.patch(`/articles/view-Increase/${id}`);
    navigate(`/article/${id}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mb-5">
      <h1 className="text-2xl font-bold mb-4">All Premium Articles</h1>

      {premiumArticles.length <= 0 && (
        <h1 className="text-4xl text-center mt-40 font-bold">
          Article Not Found!
        </h1>
      )}

      {/* premiumArticles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumArticles.map((article) => (
          <div
            key={article._id}
            className={`card p-4 border rounded-2xl shadow-sm flex flex-col justify-between transition hover:shadow-md ${
              article.isPremium ? "border-yellow-500" : "border-gray-200"
            }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-1">
              Publisher: {article.publisher}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              {article.description.slice(0, 100)}...
            </p>

            <button
              onClick={() => detailsPage(article._id)}
              className="btn btn-primary rounded-md"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default PremiumArticles;
