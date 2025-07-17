
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Share/Loader";
import { useParams } from "react-router";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  

  const { data: details = {}, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article-details/${id}`);
      return res.data;
    },
  });
  

  if (isLoading) return <Loader/>;

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-4">{details.title}</h1>

      <img src={details.image} alt={details.title} className="w-full max-h-[400px] object-cover rounded-lg mb-4" />

      <div className="flex items-center gap-4 mb-4">
        <img src={details.publisher_logo} alt={details.publisher_logo} className="w-12 h-12 rounded-full border-1 border-gray-300" />
        <div>
          <p className="font-semibold">{details.publisher}</p>
          <p className="text-sm text-gray-500">Posted: {new Date(details.posted_date).toLocaleString()}</p>
        </div>
      </div>

      <p className="mb-4 text-gray-600 leading-relaxed">{details.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {details.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-2 font-medium ml-1">Views: {details.views}</p>
    </div>
  );
};

export default ArticleDetails;
