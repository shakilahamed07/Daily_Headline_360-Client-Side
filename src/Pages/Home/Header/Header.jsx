import React from 'react';
import Logo from '../../../assets/Logo.png'

const Header = () => {
    return (
        <div className='sm:flex justify-between items-center gap-3.5 max-w-[1250px] mx-auto px-2 my-3 hidden'>
            {/* Logo */}
            <img className='w-50 h-12 ' src={Logo} alt="" />

            {/* Advertise */}
            <div className="hidden bg-black md:w-150  py- sm:flex justify-between items-center">
                <h1 className='text-white pl-20 font-medium hidden md:block animate-pulse'>Advertise</h1>
                <img className='h-15 w-80' src="https://www.mockofun.com/wp-content/uploads/2021/10/real-estate-banner-design-51034.jpg" alt="Advertise img" />
            </div>
        </div>
    );
};

export default Header;