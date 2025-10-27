import React from 'react';
import { Link, NavLink } from 'react-router';
import user from '../assets/user.png'

const Navbar = () => {
    return (
        <div className='flex items-center'>
            
            <div className='flex-1'></div>

            <div className='flex-1 flex justify-center pl-2 transform -translate-x-4'>
                <nav className="nav flex gap-10 text-accent items-center">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/blog'>Blog</NavLink>
                </nav>
            </div>

            {/* right column: login */}
            <div className="flex-1 flex justify-end items-center gap-5">
                <img src={user} alt="" />
               <Link to ='/auth/signin' className='btn btn-primary px-10'>Sign In</Link>
            </div>
        </div>
    );
};

export default Navbar;