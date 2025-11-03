import React, { useContext, useMemo } from 'react';
import classImg from '../assets/class.png';
import playgroundImg from '../assets/playground.png';
import swimmingImg from '../assets/swimming.png';
import { PaginationContext } from '../contexts/PaginationContext';

const AdCard = ({ img, title = 'Sponsored', cta = 'Visit', href = '#' }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block">
    <div className="card bg-base-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-56 object-cover" />
        <span className="badge badge-secondary absolute top-2 left-2">Ad</span>
      </div>
      <div className="card-body p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
        <button className="btn btn-sm btn-primary w-full">{cta}</button>
      </div>
    </div>
  </a>
);

const AdsColumn = ({ side = 'left' }) => {
  const ads = useMemo(() => ([
    { img: classImg, title: 'Upgrade your skills with our online courses', href: '#' },
    { img: playgroundImg, title: 'Explore tech gadgets at a discount', href: '#' },
    { img: swimmingImg, title: 'Summer sports and fitness deals', href: '#' },
  ]), []);

  // If on the last page, remove two ads from this column
  const [paginationInfo] = useContext(PaginationContext) || [{ page: 1, totalPages: 1 }];
  const prunedAds = useMemo(() => {
    if (paginationInfo && paginationInfo.page === paginationInfo.totalPages) {
      return ads.slice(0, Math.max(0, ads.length - 2));
    }
    return ads;
  }, [ads, paginationInfo]);

  return (
    <div className="space-y-5 sticky top-24">
      {prunedAds.map((ad, idx) => (
        <AdCard key={`${side}-ad-${idx}`} {...ad} />
      ))}
    </div>
  );
};

export default AdsColumn;
