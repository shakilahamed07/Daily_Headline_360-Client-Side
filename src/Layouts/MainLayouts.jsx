import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Share/Navbar';
import Footer from '../Components/Share/Footer';
import Header from '../Pages/Home/Header/Header';
import { ToastContainer } from 'react-toastify';


const MainLayouts = () => {
    return (
        <div>
            <header>
                <Header/>
                <Navbar/>
            </header>
            <main className='min-h-[calc(100vh-(285px))] max-w-[1350px] mx-auto '>
                <Outlet></Outlet>
            </main>
            <Footer/>
            <ToastContainer/>
        </div>
    );
};

export default MainLayouts;