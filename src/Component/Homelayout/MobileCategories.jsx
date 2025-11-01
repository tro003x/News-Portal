import React, { use } from 'react';
import { NavLink } from 'react-router-dom';

// Reuse the same runtime data approach as Categories component
const CategoriesPromise = fetch('/categories.json').then((res) => res.json());

const MobileCategories = () => {
  const categories = use(CategoriesPromise);
  return (
    <div className="w-full">
      <details className="dropdown w-full">
        <summary className="btn btn-outline w-full justify-between">
          Categories
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
          </svg>
        </summary>
        <ul className="dropdown-content menu bg-base-100 rounded-box w-64 mt-2 p-2 shadow z-50">
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default MobileCategories;
