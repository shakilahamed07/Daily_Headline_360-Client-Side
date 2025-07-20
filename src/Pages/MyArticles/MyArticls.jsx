import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const MyArticles = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [declineReason, setDeclineReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const queryClient = useQueryClient();

  const { data: articles = [] } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-articles/${user.email}`);
      return res.data;
    },
  });

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
      queryClient.invalidateQueries(["my-articles"]);
    }
  };

  const handleViewReason = (article) => {
    setSelectedArticle(article);
    setDeclineReason(article.decline_reason);
    setShowReasonModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Articles</h2>

      {articles.length <= 0 ? (
        <h1 className="text-4xl text-center mt-40 font-bold">
          Article Not Found!
        </h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Premium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>
                    {article.status === "decline" ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-500">Declined</span>
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => handleViewReason(article)}
                        >
                          Reason
                        </button>
                      </div>
                    ) : (
                      <span
                        className={
                          article.status === "approved"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                      </span>
                    )}
                  </td>
                  <td>{article.isPremium ? "Yes" : "No"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => navigate(`/article/${article._id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-xs btn-warning my-2"
                      onClick={() => navigate(`/update-article/${article._id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs btn-error"
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
      )}

      {/* Decline Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold  mb-2">Decline Reason</h3>
            <p className="text-sm text-gray-700">{declineReason}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowReasonModal(false)}
                className="btn btn-sm btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
