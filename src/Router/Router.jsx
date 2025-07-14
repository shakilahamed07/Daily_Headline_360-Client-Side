import React from 'react';
import {
    createBrowserRouter,
  } from "react-router";
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Register/Login';
import Register from '../Pages/Register/Register';
import ErrorElement from '../Pages/ErrorElement';
import Subscription from '../Pages/Home/Subscription/subscription';
import PriveteRoute from './PriveteRoute';

  export const router = createBrowserRouter([
    {
      path: "/",
      Component: MainLayouts,
      errorElement: <ErrorElement></ErrorElement>,
      children:[
        {
          index: true,
          path:'/',
          Component: Home
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/subscription',
          element: <PriveteRoute><Subscription/></PriveteRoute>
        },
      ]
    },
  ]);