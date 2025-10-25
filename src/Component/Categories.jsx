import React, { use } from 'react';
import { NavLink } from 'react-router';

const CategoriesPromise = fetch('/categories.json').then((res)=> res.json());

const Categories = () => {
    const categories = use(CategoriesPromise)
    return (
        <div className=''>
            <h2 className='font-bold'>All Categores</h2>
            <div className='grid grid-cols-1 mt-5 gap-2'>
                {
                    categories.map(category=><NavLink key={category.id} className={'btn bg-base-100 border-0 hover:bg-base-200 font-semibold text-accent'} to={`/category/${category.id}`}>{category.name}</NavLink>)
                }
            </div>
        </div>
    );
};

export default Categories;