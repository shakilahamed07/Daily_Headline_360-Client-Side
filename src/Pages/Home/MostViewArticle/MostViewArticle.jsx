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


  if (isLoading) return <Loader/>;

  return (
    <div className="mx-2 mt-5 shadow-sm rounded-xl mb-10">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={4000}
        stopOnHover={false}
        >
        
        {trendingArticles.map((article) => (
          <div key={article._id} className="rounded-xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="md:h-96 h-52 w-full object-center"
            />
            <div className="p-4 bg-white text-left mb-5">
              <h3 className="text-3xl font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-5">
                Publisher: {article.publisher}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3 mb-5">
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
