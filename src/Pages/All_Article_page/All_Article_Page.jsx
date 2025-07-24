// AllArticles.jsx
import { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Share/Loader";

const All_Article_Page = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  //^ for pagination
  const [curetPage, setCuretPage] = useState(0);
  const [itemsParPage, setItemsParPage] = useState(8);
  const [count, setCount] = useState(0);
  const numberOfPage = Math.ceil(count / itemsParPage);
  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages, count)

  // Fetch article count
  const { data: a = {} } = useQuery({
    queryKey: ["countArticle"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved/articles/count-page");
      setCount(res.data.count);
      return res.data;
    },
  });

  // Fetch user
  const { data: users = {} } = useQuery({
    queryKey: ["users1"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  // Fetch publishers for dropdown
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data.map((p) => ({ value: p._id.trim(" "), label: p.name }));
    },
  });

  // Fetch articles with filters
  const { data: articles = [], isLoading } = useQuery({
    queryKey: [
      "articles",
      selectedPublisher,
      selectedTags,
      searchText,
      curetPage,
      itemsParPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedPublisher) params.append("publisher", selectedPublisher);
      if (selectedTags.length > 0)
        params.append("tags", selectedTags.join(","));
      if (searchText) params.append("search", searchText);
      const res = await axiosSecure.get(
        `/approved/articles?${params.toString()}&page=${curetPage}&size=${itemsParPage}`
      );
      return res.data;
    },
  });

  const tagOptions = [
    { value: "Politics", label: "Politics" },
    { value: "Economy", label: "Economy" },
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Sports", label: "Sports" },
    { value: "Other", label: "Other" },
  ];

  const detailsPage = async (id) => {
    await axiosSecure.patch(`/articles/view-Increase/${id}`);
    navigate(`/article/${id}`);
  };

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

  {isLoading && <Loader />}

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="lg:sticky top-17 z-40 bg-base-100 px-2 pt-3 ">
        <h1 className="text-2xl font-bold mb-4">All Articles</h1>

        {/* Filters */}
        <div className=" grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title"
            className="input input-bordered w-full md:mb-2 "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Select
            options={publishers}
            onChange={(val) => setSelectedPublisher(val?.label || null)}
            placeholder="Filter by publisher"
            isClearable
          />

          <Select
            options={tagOptions}
            isMulti
            onChange={(val) => setSelectedTags(val.map((v) => v.value))}
            placeholder="Filter by tags"
          />
        </div>
      </div>

      {articles.length <= 0 && (
        <h1 className="text-4xl text-center mt-40 font-bold">
          Article Not Found!
        </h1>
      )}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
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
              disabled={article.isPremium && !users.premiumToken}
              className={`btn rounded-md ${
                article.isPremium && !users.premiumToken
                  ? "btn-disabled"
                  : "btn-primary"
              }`}
            >
              {article.isPremium && !users.premiumToken
                ? "Subscribe to View"
                : "Details"}
            </button>
          </div>
        ))}
      </div>

      {/* //^ pagination */}
      <div className="flex items-center justify-center mx-auto mt-10 ">
        <button className="btn btn-primary hidden sm:block" onClick={handlePrev}>
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
        <button className="btn btn-primary hidden sm:block" onClick={handleNext}>
          Next
        </button>
        <select
          value={itemsParPage}
          onChange={handleItemPerPage}
          className="border ml-3 border-primary p-1 sm:p-2 rounded-md"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default All_Article_Page;
