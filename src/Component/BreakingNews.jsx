import React from 'react';
import Marquee from 'react-fast-marquee';

const BreakingNews = () => {
    return (
        <div className='flex items-center gap-5 bg-base-200 p-3'>
            <p className='text-base-100 bg-secondary px-3 py-2'>Latest</p>
            <Marquee className='flex gap-5' pauseOnHover ={true} speed={70}>
                <p className='font-bold '>Hellow Beautiful people. It's me, Auritro. So this site was a fun project for me. </p>
                
                <p className='font-bold'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quibusdam sed tempore ducimus quisquam quas officiis, delectus modi quam a animi minima blanditiis perferendis, neque voluptatibus consequatur sequi amet! Architecto.</p>
            </Marquee>
        </div>
    );
};

export default BreakingNews;