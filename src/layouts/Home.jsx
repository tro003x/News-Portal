import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import TopBar from '../Component/TopBar';
import BreakingNews from '../Component/BreakingNews';
import Navbar from '../Component/Navbar';
// RightAside removed; content moved to footer
import Footer from '../Component/Footer';

const Home = () => {
    const location = useLocation();
    // hide side placeholders on news details pages (path like /news/:id)
    const hideLeftAside = location.pathname.startsWith('/news/');
    // Footer now shows on all pages; no route gating
    // mobile categories dropdown removed; categories now live in top hamburger
    // Reinstate 12-col grid scaffolding: 2 (left) | 8 (news) | 2 (right)
    // Left and right are intentionally blank spacers on Home-like pages.

    return (
        <div>
            <header className='pt-8'>
                {/* Top bar: left date + categories hamburger, right auth buttons */}
                <TopBar />

                {/* Center logo/title */}
                <div className='w-11/12 mx-auto mt-0'>
                    <Header />
                </div>

                {/* Main nav links */}
                <nav className='w-11/12 mx-auto mt-0 mb-0'>
                    <Navbar />
                </nav>

                {/* Latest marquee at the bottom of header, only on non-details */}
                {!hideLeftAside && (
                    <section className='w-11/12 mx-auto py-5'>
                        <BreakingNews />
                    </section>
                )}
            </header>

           
            <main className='w-11/12 mx-auto my-3 grid grid-cols-1 md:grid-cols-12 gap-6'>
                {/* Left spacer: keep blank to center news in middle 8 cols */}
                {!hideLeftAside && <aside className='hidden md:block md:col-span-2' />}

                {/* Middle: news/content area */}
                <section className={`col-span-12 ${hideLeftAside ? 'md:col-span-12' : 'md:col-span-8'} min-h-screen md:min-h-0`}>
                    <div className='pb-10 pr-1'>
                        <Outlet />
                    </div>
                </section>

                {/* Right spacer: keep blank to mirror left */}
                {!hideLeftAside && <aside className='hidden md:block md:col-span-2' />}
            </main>

            <div className='w-11/12 mx-auto mt-10'>
                <Footer />
            </div>
        </div>
    );
};

export default Home;