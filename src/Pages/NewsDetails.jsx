import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/news.json')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const found = data.find((n) => n.id === id || n._id === id);
        setArticle(found || null);
      })
      .catch(() => setArticle(null))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return (
    <div>
      <p className="text-red-500">Article not found.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );

  const { title, image_url, author, details, total_view } = article;

  return (
    <article className="bg-white rounded-md shadow-sm p-6">
      <img src={image_url || article.thumbnail_url} alt={title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{title}</h1>

      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
        <img src={author?.img} alt={author?.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-medium">{author?.name}</div>
          <div className="text-xs">{author?.published_date?.slice(0, 10) || ''}</div>
        </div>
        <div className="ml-auto text-sm text-gray-700">Views: {total_view || 0}</div>
      </div>

      <div className="prose mt-6 text-gray-800">
        <p>{details}</p>
      </div>

      <div className="mt-6">
        <Link to="/" className="btn btn-secondary">← All news in this category</Link>
      </div>
    </article>
  );
};

export default NewsDetails;
