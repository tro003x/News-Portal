import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import NewsCard from "../Component/NewsCard";
import Pagination from "../Component/Pagination";

const CategoryNews = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [categoryNews, setCategoryNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  useEffect(() => {
    if (id == "0") {
      setCategoryNews(data);
      setCurrentPage(1);
      return;
    } else if (id == "1") {
      const filteredNews = data.filter(
        (news) => news.others.is_today_pick == true
      );
      setCategoryNews(filteredNews);
      setCurrentPage(1);
    } else {
  const filteredNews = data.filter((news) => news.category_id == id);
      setCategoryNews(filteredNews);
      setCurrentPage(1);
    }
  }, [data, id]);

  const total = categoryNews.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(currentPage, totalPages);
  const pagedNews = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return categoryNews.slice(start, end);
  }, [categoryNews, page]);

  useEffect(() => {
    // Scroll up a bit on page change for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  return (
    <div >
      <h2 className="font-bold mb-3 ">
        Total found{" "}
        <span className="text-secondary">{total}</span>
      </h2>
      <div>
        {pagedNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
      <Pagination
        totalItems={total}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryNews;
