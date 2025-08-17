import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";
import { useNavigate } from "react-router";

const MostViewArticle = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { data: trendingArticles = [], isLoading} = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/trending");
      return res.data;
    },
  });

  const handelViwDetails  = (id) =>{
      navigate(`/article/${id}`)
  }


  if (isLoading) return <Loader/>;

  return (
    <div className="mx-2 mt-5 shadow-sm rounded-2xl mb-10">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={4000}
        stopOnHover={false}
        >
        
        {trendingArticles.map((article) => (
          <div key={article._id} className="flex" onClick={()=>handelViwDetails(article._id)}>
            <div className="rounded-2xl overflow-hidden bg-base-200">
            <img
              src={article.image}
              alt={article.title}
              className="md:h-96 h-52 w-full object-center"
            />
            <div className="p-4 text-left mb-5 bg-base-200">
              <h3 className="md:text-4xl text-3xl font-semibold mb-1 text-center line-clamp-1">{article.title}</h3>
              <p className="mb-5 text-center mt-2">
                Publisher: {article.publisher}
              </p>
              <p className="text-sm line-clamp-3 mb-5 text-center">
                {article.description}
              </p>
            </div>
          </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MostViewArticle;
