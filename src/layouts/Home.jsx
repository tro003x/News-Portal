import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import TopBar from '../Component/TopBar';
import BreakingNews from '../Component/BreakingNews';
import Navbar from '../Component/Navbar';
// RightAside removed; content moved to footer
import Footer from '../Component/Footer';
import AdsColumn from '../Component/AdsColumn';
import { PaginationContext } from '../contexts/PaginationContext';

const Home = () => {
    const location = useLocation();
    // Show side ads only on the main Home list page
    const showAds = location.pathname === '/category/0';
    // Footer now shows on all pages; no route gating
    // mobile categories dropdown removed; categories now live in top hamburger
    // Reinstate 12-col grid scaffolding: 2 (left) | 8 (news) | 2 (right)
    // Left and right are intentionally blank spacers on Home-like pages.

    return (
    <PaginationContext.Provider value={useState({ page: 1, totalPages: 1 })}>
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

                {/* Latest marquee: only on the main Home list (category 0) */}
                {location.pathname === '/category/0' && (
                    <section className='w-11/12 mx-auto py-5'>
                        <BreakingNews />
                    </section>
                )}
            </header>

           
            <main className='w-11/12 mx-auto my-3 grid grid-cols-1 md:grid-cols-12 gap-6'>
                {/* Left ads: Home page only */}
                {showAds && (
                    <aside className='hidden md:block md:col-span-2'>
                        <AdsColumn side='left' />
                    </aside>
                )}

                {/* Middle: news/content area */}
                <section className={`col-span-12 ${showAds ? 'md:col-span-8' : 'md:col-span-12'} min-h-screen md:min-h-0`}>
                    <div className='pb-10 pr-1'>
                        <Outlet />
                    </div>
                </section>

                {/* Right ads: Home page only */}
                {showAds && (
                    <aside className='hidden md:block md:col-span-2'>
                        <AdsColumn side='right' />
                    </aside>
                )}
            </main>

            <div className='w-11/12 mx-auto mt-10'>
                <Footer />
            </div>
    </div>
    </PaginationContext.Provider>
    );
};

export default Home;