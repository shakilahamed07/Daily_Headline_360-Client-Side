import React, { use } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import {  Navigate, useLocation } from 'react-router';
import Loader from '../Components/Share/Loader';

const PriveteRoute = ({children}) => {
    const {loader, user} = use(AuthContext);
    const location = useLocation();

    if(loader){
        return <Loader></Loader>
    }
    else if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    else{
        return children ;
    }
};

export default PriveteRoute;