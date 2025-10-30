import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(null);
  const { user, loading: authLoading } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    fetch('/blog.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load blog data');
        return res.json();
      })
      .then((json) => {
        if (mounted) setPosts(json);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6">Loading blog posts...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">Career & Blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 border rounded bg-white shadow-sm">
            <div className=" text-secondary flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="text-sm text-gray-500">{post.author} • {post.date}</div>
              </div>
              <button
                onClick={() => {
                  // if auth still initialising, do nothing
                  if (authLoading) return;
                  // if not logged in redirect to signin and show toast
                  if (!user) {
                    toast.info('Please Sign In to read the full blog post');
                    navigate('/auth/signin');
                    return;
                  }
                  setOpen(open === post.id ? null : post.id);
                }}
                className="btn btn-secondary btn-ghost btn-sm"
              >
                {open === post.id ? 'Hide' : 'Read more'}
              </button>
            </div>

            <p className="mt-3 text-gray-700">{post.excerpt}</p>

            {open === post.id && (
              <div className="mt-3 text-gray-800">
                <p>{post.details}</p>
                <div className="mt-3 text-sm text-gray-500">Tags: {post.tags.join(', ')}</div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
