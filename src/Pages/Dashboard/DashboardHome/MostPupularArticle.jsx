import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const MostPupularArticle = () => {
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    axios.get("http://localhost:5000/articles/top-views", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => setTopArticles(res.data))
  }, []);

  const chartData = [
    ["Title", "Views", { type: "string", role: "tooltip" }],
    ...topArticles.map((article) => [
      article.title.length > 25
        ? article.title.slice(0, 25) + "..."
        : article.title,
      article.views,
      `${article.title} (${article.publisher})\nViews: ${article.views}`,
    ]),
  ];

  const chartOptions = {
    title: "Top 5 Most Viewed Articles",
    hAxis: { title: "Article Title" },
    vAxis: { title: "Views" },
    legend: "none",
    tooltip: { isHtml: true },
    colors: ["#34a853"],
    areaOpacity: 0.2,
    lineWidth: 3,
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default MostPupularArticle;
