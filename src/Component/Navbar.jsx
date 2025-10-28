import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import userIcon from '../assets/user.png'
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, setUser, logOut } = useContext(AuthContext) || {};
    return (
        <div className='flex items-center'>
            
            <div className='flex-1'>{user && user.email}</div>

            <div className='flex-1 flex justify-center pl-2 transform -translate-x-4'>
                <nav className="nav flex gap-10 text-accent items-center">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/blog'>Blog</NavLink>
                </nav>
            </div>

            {/* right column: login */}
            <div className="flex-1 flex justify-end items-center gap-5">
                <img src={user?.photoURL || userIcon} alt="" className="w-8 h-8 rounded-full" />
                {user ? (
                    <div className="flex items-center gap-3">
                        {user.name && <span className="text-sm font-medium">Hi, {user.name}</span>}
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
                            className="btn btn-primary px-10"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link to='/auth/signin' className='btn btn-primary px-10'>Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;