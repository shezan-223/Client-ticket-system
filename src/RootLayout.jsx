import React from 'react';
import { Outlet } from 'react-router';
import Navabar from './Home/Navabar';
import Footer from './Component/Footer';

const RootLayout = () => {
    return (
        <div>

            <div className='sticky'>

             <Navabar></Navabar>
            </div>
            <div>

            <Outlet></Outlet>
            </div>
            <div className='mt-50'>

            <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;