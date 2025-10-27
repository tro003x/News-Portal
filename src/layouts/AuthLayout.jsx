import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-base-200 min-h-screen'>
            <header className='w-11/12 py-4 mx-auti'>
                <Navbar></Navbar>
            </header>
            <main className='bg-base-200 min-h-screen'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;