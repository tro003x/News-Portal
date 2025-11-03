import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

// Pagination component with truncated page list and Prev/Next controls
// Props: totalItems (number), pageSize (number), currentPage (number), onPageChange (fn)
const Pagination = ({ totalItems = 0, pageSize = 5, currentPage = 1, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const makeRange = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  };

  const getItems = () => {
    const pages = totalPages;
    if (pages <= 6) return makeRange(1, pages);

    const tailSize = 3; // always show last three: e.g., 10, 11, 12
    const windowSize = 3; // sliding window at the front: e.g., 1, 2, 3 then 2, 3, 4 ...

    const c = clamp(currentPage, 1, pages);
    const tailStart = pages - tailSize + 1; // 10 for 12 pages

    // Determine front window start so that current page is the middle item
    // and it slides like: [1,2,3] -> click 3 => [2,3,4] -> click 4 => [3,4,5]
    const frontStartMax = Math.max(1, tailStart - windowSize); // don't let front overlap tail
    let frontStart = c - 1; // center-ish, per requested behavior
    frontStart = clamp(frontStart, 1, frontStartMax);
    const frontEnd = Math.min(frontStart + windowSize - 1, pages);

    const items = [];
    // front window
    items.push(...makeRange(frontStart, frontEnd));

    // gap and tail
    if (frontEnd < tailStart - 1) items.push('ellipsis');
    const tail = makeRange(tailStart, pages);
    tail.forEach((t) => {
      if (!items.includes(t)) items.push(t);
    });

    return items;
  };

  const items = getItems();

  const handleChange = (p) => {
    if (!onPageChange) return;
    const page = clamp(p, 1, totalPages);
    if (page !== currentPage) onPageChange(page);
  };

  if (totalItems <= pageSize) return null;

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          className="btn btn-sm btn-circle btn-outline"
          disabled={currentPage <= 1}
          onClick={() => handleChange(currentPage - 1)}
        >
          <HiOutlineChevronLeft />
        </button>
        {items.map((it, idx) =>
          typeof it === 'number' ? (
            <button
              key={`p-${it}-${idx}`}
              type="button"
              className={`btn btn-sm btn-circle ${currentPage === it ? 'btn-primary text-white' : 'btn-outline'}`}
              onClick={() => handleChange(it)}
            >
              {it}
            </button>
          ) : (
            <span
              key={`e-${idx}`}
              aria-hidden="true"
              className="btn btn-sm btn-circle btn-ghost text-lg font-semibold"
            >
              …
            </span>
          )
        )}
        <button
          type="button"
          aria-label="Next page"
          className="btn btn-sm btn-circle btn-outline"
          disabled={currentPage >= totalPages}
          onClick={() => handleChange(currentPage + 1)}
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
