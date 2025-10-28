import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const Star = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12 .587l3.668 7.431L23.4 9.748l-5.7 5.556L19.335 24 12 20.201 4.665 24l1.635-8.696L.6 9.748l7.732-1.73z" />
    </svg>
);

const Eye = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    </svg>
);

const Share = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M15 8a3 3 0 10-2.83-4H9a1 1 0 00-1 1v12a1 1 0 001 1h3.17A3 3 0 1015 16a2.99 2.99 0 00-2.83 2H10V6h2.17A3 3 0 0015 8z" />
    </svg>
);

const NewsCard = ({ news }) => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext) || {};

    if (!news) return null;

    const author = news.author || {};
    const title = news.title || 'Untitled';
    const details = news.details || '';
    const image = news.image_url || news.thumbnail_url || '';
    const views = news.total_view || news.views || 0;
    const rating = (news.rating && news.rating.number) || news.rating || 0;

    const handleReadMore = (id) => {
        if (loading) {
            const toastId = 'auth-checking';
            toast.info('Checking authentication...', { toastId, autoClose: false });
            const check = setInterval(() => {
                if (!loading) {
                    clearInterval(check);
                    toast.dismiss(toastId);
                    if (user) {
                        navigate(`/news/${id}`);
                    } else {
                        toast.info('Please Sign In to see news details');
                        navigate('/auth/signin');
                    }
                }
            }, 200);

            return;
        }

        if (user) {
            navigate(`/news/${id}`);
        } else {
            toast.info('Please Sign In to see news details');
            navigate('/auth/signin');
        }
    };

    return (
        <article className="bg-white shadow-sm rounded-md p-4 mb-6">
            {/* header: author, date, share */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img
                        src={author.img || '/src/assets/user.png'}
                        alt={author.name || 'author'}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-semibold">{author.name || 'Unknown Author'}</p>
                        <p className="text-xs text-gray-500">{author.published_date || author.published || news.published_date || ''}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                    <button aria-label="share" className="hover:text-gray-900">
                        <Share />
                    </button>
                </div>
            </div>

            {/* body: text + image */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        {details.length > 220 ? details.slice(0, 220) + '...' : details}
                        {details.length > 220 && (
                            <button
                                className="text-red-500 ml-1 underline"
                                onClick={() => handleReadMore(news.id || news._id || '')}
                            >
                                Read More
                            </button>
                        )}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-yellow-500">
                            <Star />
                            <span className="text-sm font-medium text-gray-800">{rating}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Eye />
                            <span className="text-sm">{views}</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-44 w-full md:shrink-0">
                    <img src={image} alt={title} className="w-full md:h-32 h-48 object-cover rounded" />
                </div>
            </div>
        </article>
    );
};

export default NewsCard;