import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../Component/Header';
import BreakingNews from '../Component/BreakingNews';
import Navbar from '../Component/Navbar';
import LeftAside from '../Component/Homelayout/LeftAside';
import RightAside from '../Component/Homelayout/RightAside';

const Home = () => {
    const location = useLocation();
    // hide left aside on news details pages (path like /news/:id)
    const hideLeftAside = location.pathname.startsWith('/news/');

    // responsive main column classes: full width on small, 6 cols on md, 9 cols when left aside hidden
    const mainClass = hideLeftAside ? 'col-span-12 md:col-span-9' : 'col-span-12 md:col-span-6';

    return (
        <div>
            <header>
                <Header />
                {/* hide latest-marquee (BreakingNews) on news details pages */}
                {!hideLeftAside && (
                    <section className='w-11/12 mx-auto my-5'>
                        <BreakingNews />
                    </section>
                )}
                <nav className='w-11/12 mx-auto my-5'>
                    <Navbar />
                </nav>
            </header>

           
            <main className='w-11/12 mx-auto my-3 grid grid-cols-1 md:grid-cols-12 min-h-screen gap-6'>
                {/* left aside hidden on small screens; shows on md+ */}
                {!hideLeftAside && (
                    <aside className='hidden md:block md:col-span-3'>
                        <div className='sticky top-24 h-[calc(100vh-6rem)] overflow-auto'>
                            <LeftAside />
                        </div>
                    </aside>
                )}

                <section className={`main ${mainClass}`}>
                    <Outlet />
                </section>

                {/* right aside: hidden on small screens */}
                <aside className='hidden md:block md:col-span-3'>
                    <div className='sticky top-24 h-[calc(100vh-6rem)] overflow-auto'>
                        <RightAside />
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Home;