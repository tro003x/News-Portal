import React from 'react';
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <div className='flex justify-center flex-col items-center gap-1 p-0 m-0'>
            <img className='w-[360px] max-w-full' src={logo} alt="logo" />
            <p className='text-accent'>Journalism Without Fear & Favour</p>
        </div>
    );
};

export default Header;