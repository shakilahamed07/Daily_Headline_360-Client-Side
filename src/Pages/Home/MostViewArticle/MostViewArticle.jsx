import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";

const MostViewArticle = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trendingArticles = [], isLoading} = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/trending");
      return res.data;
    },
  });

  console.log(trendingArticles)

  if (isLoading) return <Loader/>;

  return (
    <div className="max-w-7xl mx-auto my-5 shadow rounded-2xl">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={4000}
        swipeable={true}
        stopOnHover={false}>
        {trendingArticles.map((article) => (
          <div key={article._id} className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={article.image}
              alt={article.title}
              className="md:h-96 w-full object-cover"
            />
            <div className="p-4 bg-white text-left mb-5">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Publisher: {article.publisher}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MostViewArticle;
