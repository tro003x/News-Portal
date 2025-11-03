import React, { useState, use } from 'react';
import { NavLink } from 'react-router-dom';

const CategoriesPromise = fetch('/categories.json').then((r) => r.json());

const CategoriesMenu = () => {
  const categories = use(CategoriesPromise);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="open categories"
        className="p-2"
        onClick={() => setOpen((o) => !o)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50 p-2 max-h-80 overflow-auto">
          <div className="font-semibold px-2 py-1">Categories</div>
          <div className="flex flex-col gap-1">
            {categories.map((c) => (
              <NavLink key={c.id} to={`/category/${c.id}`} className="px-2 py-1 rounded hover:bg-base-200" onClick={() => setOpen(false)}>
                {c.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
