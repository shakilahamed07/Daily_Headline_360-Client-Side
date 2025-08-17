import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllPublisher = () => {
  const axiosSecure= useAxiosSecure();

  const { data: publishers = [], isLoading, isError } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading publishers...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load publishers</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Publishers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {publishers.map((publisher, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105"
          >
            <div className="flex justify-center p-4">
              <img
                src={publisher.logo}
                alt={publisher.name}
                className="h-28 sm:max-w-[200px] w-30 object-contain"
              />
            </div>
            <div className="px-4 pb-4 text-center">
              <h3 className="text-lg font-semibold text-black">{publisher.name}</h3>
              <p className="text-gray-500 text-sm hidden lg:block">Reputable News Source</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublisher;
