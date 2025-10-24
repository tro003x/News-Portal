import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Component/Header';
import BreakingNews from '../Component/BreakingNews';
import Navbar from '../Component/Navbar';
import LeftAside from '../Component/Homelayout/LeftAside';

const Home = () => {
    return (
        <div>
            <header>
                <Header></Header>
                 <section className='w-11/12 mx-auto my-5'>
                        <BreakingNews></BreakingNews>
                    </section>
                    <nav className='w-11/12 mx-auto my-5'>
                        <Navbar >    </Navbar>
                    </nav>
            </header>
            <main>
                <aside>
                    <LeftAside></LeftAside>
                </aside>
            <section className='main'>
                <Outlet></Outlet>
            </section>
            <section className='right_nav'></section>
            </main>
        </div>
    );
};

export default Home;