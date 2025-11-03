import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';

const AuthLayout = () => {
    return (
        <div className='bg-base-200 min-h-screen flex flex-col'>
            <header className='w-11/12 py-4 mx-auto'>
                <Navbar padLeft />
            </header>
            <main className='bg-base-200 flex-1'>
                <Outlet />
            </main>
            <div className='w-11/12 mx-auto mt-10 mb-10'>
                <Footer />
            </div>
        </div>
    );
};

export default AuthLayout;