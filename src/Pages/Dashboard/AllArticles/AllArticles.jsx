import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Share/Loader";
import { BiError } from "react-icons/bi";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [declineId, setDeclineId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  //^ for pagination
  const [curetPage, setCuretPage] = useState(0);
  const [itemsParPage, setItemsParPage] = useState(10);
  const [count, setCount] = useState(0);
  const numberOfPage = Math.ceil(count / itemsParPage);
  const pages = [...Array(numberOfPage).keys()];

  // Fetch article count
  const { data: b = {} } = useQuery({
    queryKey: ["allArticleCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/count");
      setCount(res.data);
      return res.data;
    },
  });

  // Get all articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", curetPage, itemsParPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/articles?page=${curetPage}&size=${itemsParPage}`
      );
      return res.data;
    },
  });

  console.log(curetPage, itemsParPage);

  //^ pagination

  const handlePrev = () => {
    if (curetPage > 0) {
      setCuretPage(curetPage - 1);
    }
  };

  const handleNext = () => {
    if (pages.length - 1 > curetPage) {
      setCuretPage(curetPage + 1);
    }
  };

  const handleItemPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsParPage(val);
    setCuretPage(0);
  };

  //^ admin action
  // Approve article
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/approve/article/${id}`);
    Swal.fire({
      title: "Approved!",
      text: "Article is now visible to users.",
      icon: "success",
      confirmButtonColor: "#d33",
      timer: 1500,
    });
    queryClient.invalidateQueries(["articles"]);
  };

  // Make Premium
  const handleMakePremium = async (id, value) => {
    await axiosSecure.patch(`/premium/article/${id}`, { value: value });

    Swal.fire({
      title: "Premium!",
      text: "This article is now marked as premium.",
      icon: "success",
      confirmButtonColor: "#d33",
      timer: 1500,
    });
    queryClient.invalidateQueries(["articles"]);
  };

  // Delete article
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This article will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/delete/article/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "The article has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["articles"]);
    }
  };

  // Decline submit
  const handleDeclineSubmit = async () => {
    await axiosSecure.patch(`/articles/decline/${declineId}`, {
      reason: declineReason,
    });
    Swal.fire({
      title: "Declined!",
      text: "Reason saved successfully",
      icon: "success",
      confirmButtonColor: "#d33",
      timer: 2500,
    });
    setDeclineId(null);
    setDeclineReason("");
    queryClient.invalidateQueries(["articles"]);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Posted</th>
              <th>Status</th>
              <th>Publisher</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td className="max-w-[200px]">{article.title}</td>
                <td>{article.creator_name}</td>
                <td>{article.creator_email}</td>
                <td>
                  <img
                    src={article.creator_img}
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{new Date(article.posted_date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      article.status === "approved"
                        ? "badge-success"
                        : article.status === "declined"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    <span className="text-red-600">
                      {article?.status === "decline" && <BiError size={16} />}
                    </span>
                    {article.status}
                  </span>
                </td>
                <td>{article.publisher}</td>
                <td>
                  {article.isPremium ? (
                    <span className="badge badge-info">Yes</span>
                  ) : (
                    <span className="badge">No</span>
                  )}
                </td>
                <td className="space-y-1">
                  {article.status === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success w-full"
                        onClick={() => handleApprove(article._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs btn-warning w-full mt-1"
                        onClick={() => setDeclineId(article._id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {article.isPremium ? (
                    <button
                      className="btn btn-xs btn-info w-full mt-1"
                      onClick={() => handleMakePremium(article._id, false)}
                    >
                      Make Free
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-info w-full mt-1"
                      onClick={() => handleMakePremium(article._id, true)}
                    >
                      Make Premium
                    </button>
                  )}

                  <button
                    className="btn btn-xs btn-error w-full mt-1 min-w-30"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* //^ pagination */}
      <div className="flex items-center justify-center mx-auto mt-10 mb-5 ">
        <button className="btn btn-primary" onClick={handlePrev}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCuretPage(page)}
            className={`${
              curetPage === page ? "bg-primary text-white" : ""
            } m-2 py-1 px-2 border border-primary rounded-md`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
        <select
          value={itemsParPage}
          onChange={handleItemPerPage}
          className="border ml-3 border-primary p-2 rounded-md"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Decline Modal */}
      {declineId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3">Reason for Decline</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Write the reason here..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setDeclineId(null);
                  setDeclineReason("");
                }}
              >
                Cancel
              </button>
              <button className="btn btn-warning" onClick={handleDeclineSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
