import React, { use } from 'react';

const CategoriesPromise = fetch('/categories.json').then((res)=> res.json());

const Categories = () => {
    const categories = use(CategoriesPromise)
    return (
        <div className='font-bold'>
            All Categores
        </div>
    );
};

export default Categories;