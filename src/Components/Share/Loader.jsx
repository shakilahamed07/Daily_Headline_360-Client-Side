import React from 'react';

const Loader = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <span className="loading loading-spinner  md:w-12 w-8"></span>
        </div>
    );
};

export default Loader;