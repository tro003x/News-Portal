import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../assets/user.png'
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, setUser, logOut } = useContext(AuthContext) || {};
    const [open, setOpen] = useState(false);
    return (
    <div className='relative flex items-center'>
            {/* left column intentionally hidden - do not display user email here */}

            {/* center: nav links - hidden on small screens */}
            <div className='flex-1 flex items-center justify-start md:justify-center'>
                <nav className="hidden md:flex nav gap-6 text-accent items-center justify-center">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/blog'>Blog</NavLink>
                </nav>

                {/* mobile menu button */}
                <button className='md:hidden py-2 pr-2 pl-0' onClick={() => setOpen(!open)} aria-label='menu'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* right column: login */}
            <div className="flex-1 flex justify-end items-center gap-5">
                <img src={user?.photoURL || userIcon} alt="" className="w-8 h-8 rounded-full" />
                {user ? (
                    <div className="flex items-center gap-3">
                        {user.name && <span className="hidden sm:inline text-sm font-medium">Hi, {user.name}</span>}
                        <button
                            onClick={async () => {
                                if (typeof logOut === 'function') {
                                    try {
                                        await logOut();
                                        toast.success('Successfully logged out');
                                    } catch (err) {
                                        toast.error('Logout failed: ' + (err?.message || err));
                                    }
                                } else if (typeof setUser === 'function') {
                                    setUser(null);
                                    toast.success('Successfully logged out');
                                } else {
                                    toast.info('No logout method available.');
                                }
                            }}
                            className="btn btn-primary px-4 md:px-10"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link to='/auth/signin' className='btn btn-primary px-4 md:px-10'>Sign In</Link>
                )}
            </div>

            {/* mobile dropdown */}
            {open && (
                <div className='absolute top-20 left-4 right-4 bg-white shadow-md rounded-md p-4 md:hidden z-50'>
                    <nav className='flex flex-col gap-3'>
                        <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                        <NavLink to='/about' onClick={() => setOpen(false)}>About</NavLink>
                        <NavLink to='/blog' onClick={() => setOpen(false)}>Blog</NavLink>
                        {!user && <Link to='/auth/signin' onClick={() => setOpen(false)}>Sign In</Link>}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;