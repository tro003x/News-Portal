import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ padLeft = false }) => {
    const baseClasses = 'px-3 py-1.5 rounded-md transition-colors duration-150';
    const hoverBg = padLeft ? 'hover:bg-base-300' : 'hover:bg-base-200';
    const activeBg = padLeft ? 'bg-base-300' : 'bg-base-200';

    return (
        <div className='w-full flex items-center justify-center pt-3'>
            <nav className={`flex gap-4 text-accent items-center ${padLeft ? 'pl-4' : ''}`}>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `${baseClasses} ${hoverBg} ${isActive ? `${activeBg} font-semibold` : ''}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        `${baseClasses} ${hoverBg} ${isActive ? `${activeBg} font-semibold` : ''}`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to='/blog'
                    className={({ isActive }) =>
                        `${baseClasses} ${hoverBg} ${isActive ? `${activeBg} font-semibold` : ''}`
                    }
                >
                    Blog
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;