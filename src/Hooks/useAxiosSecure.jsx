import axios from 'axios';
import React from 'react';

import { useNavigate } from 'react-router';
import useAuth from './useAuth';
import Loader from '../Components/Share/Loader';

const axiosSecure = axios.create({
    baseURL:'https://daily-headline-360-server-side.vercel.app',

})

const useAxiosSecure = () => {

    const { logOutUser} = useAuth();
    const navigate = useNavigate();

    // request
    axiosSecure.interceptors.request.use(config =>{

        const token = localStorage.getItem("access-token");
          config.headers.authorization = `Bearer ${token}`;

        return config
    }, error =>{
        return Promise.reject(error);
    })

    // response
    axiosSecure.interceptors.response.use(res=>{
        return res;
    },error=>{
        // console.log(error)
        const status = error.status;
        if(status === 403){
            console.log(error)
        }
        else if(status === 401){
            logOutUser()
            .then(()=>{
                navigate('/login')
            })
            .catch(()=>{})
        }

        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;