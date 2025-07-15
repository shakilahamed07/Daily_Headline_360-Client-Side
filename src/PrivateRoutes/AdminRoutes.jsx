import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loader from '../Components/Share/Loader';

const AdminRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading){
        return <Loader/>
    }

    if(!user || role !== 'admin'){
        return <Navigate to="/"></Navigate>
    }

    return children;
};

export default AdminRoutes;