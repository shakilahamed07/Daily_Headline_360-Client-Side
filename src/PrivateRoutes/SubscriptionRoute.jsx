import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../Components/Share/Loader';

const SubscriptionRoute = ({children}) => {

    const {user, loading} = useAuth();
    const {userInfo, roleLoading} = useUserRole();
    const subscription = userInfo.premiumToken;

    if(loading || roleLoading){
        return <Loader/>
    }

    if(!user || !subscription){
        return <Navigate to="/"></Navigate>
    }

    return children;
};

export default SubscriptionRoute;