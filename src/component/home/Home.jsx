import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const {} = useContext(AuthContext)
    return ( 
        <div >
            home
        </div>
    );
};

export default Home;