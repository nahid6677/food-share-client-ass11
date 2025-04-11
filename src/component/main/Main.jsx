import React, { useContext } from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../loading/Loading';

const Main = () => {
    const { loading } = useContext(AuthContext);
    return (
        <div className='relative'>
            <Navbar></Navbar>

            <div className={`${loading && "opacity-60"}`}>
                <Outlet></Outlet>
            </div>

            {
                loading && <div className="absolute left-1/2 top-32">
                    <Loading></Loading>
                </div>
            }
        </div>
    );
};

export default Main;