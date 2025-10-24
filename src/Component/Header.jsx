import React from 'react';
import logo from '../assets/logo.png'
import { format } from "date-fns";
const Header = () => {
    return (
        <div className='flex justify-center flex-col items-center gap-3'>
            <img className='[w-400px] mt-12 ' src={logo} alt="error." />
            <p className='text-accent mt-2'>Journalism Without Fear & Favour</p>
            <p className='text-semibold text-accent '>{format(new Date(), "EEEE, d MMMM, yyyy")}</p>

        </div>
    );
};

export default Header;