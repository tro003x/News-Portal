import React from 'react';
import Marquee from 'react-fast-marquee';

const BreakingNews = () => {
    return (
        <div className='flex items-center gap-5 bg-base-200 p-3'>
            <p className='text-base-100 bg-secondary px-3 py-2'>Latest</p>
            <Marquee className='flex gap-5' pauseOnHover ={true} speed={70}>
                <p className='font-bold '>Hellow Beautiful people. It's me, Auritro. So this site is a fun project for me. Made it for practice purpose. </p>
                
                <p className='font-bold'> This site has almost all the features that modern sites contains. It's mainly build with React.JS, tailwindCSS, DaisyUI, Firebase.</p>
            </Marquee>
        </div>
    );
};

export default BreakingNews;