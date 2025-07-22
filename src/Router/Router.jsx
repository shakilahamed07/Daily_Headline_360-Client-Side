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
import DashBoard from '../Layouts/Dashboard';
import AddPublisher from '../Pages/Dashboard/AddPublisher/AddPublisher';
import AdminRoutes from '../PrivateRoutes/AdminRoutes';
import AddArticle from '../Pages/AddArticle/AddArticle';
import AllArticles from '../Pages/Dashboard/AllArticles/AllArticles';
import All_Article_Page from '../Pages/All_Article_page/All_Article_Page';
import ArticleDetails from '../Pages/ArticleDetails/ArticleDetails';
import PremiumArticles from '../Pages/PremiumArticles/PremiumArticles';
import SubscriptionRoute from '../PrivateRoutes/SubscriptionRoute';
import MyArticls from '../Pages/MyArticles/MyArticls';
import UpdateArticel from '../Pages/UpdateArticle/UpdateArticel';
import Payment from '../Pages/Home/Subscription/Payment';
import MakeAdmin from '../Pages/Dashboard/MakeAdmin/MakeAdmin';
import MyProfile from '../Pages/MyProfile/MyProfile';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';

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
          path: '/profile',
          Component: MyProfile
        },
        {
          path: '/subscription',
          element: <PriveteRoute><Subscription/></PriveteRoute>
        },
        {
          path: '/payment',
          element: <PriveteRoute><Payment/></PriveteRoute>
        },
        {
          path: '/add-articles',
          element: <PriveteRoute><AddArticle/></PriveteRoute>
        },
        {
          path: '/all-articles-page',
          Component: All_Article_Page
        },
        {
          path: '/article/:id',
          element: <PriveteRoute><ArticleDetails/></PriveteRoute>
        },
        {
          path: '/my-articles',
          element: <PriveteRoute><MyArticls/></PriveteRoute>
        },
        {
          path: '/update-article/:id',
          element: <PriveteRoute><UpdateArticel/></PriveteRoute>
        },
        {
          path: '/premium-articles',
          element: <PriveteRoute><SubscriptionRoute><PremiumArticles/></SubscriptionRoute></PriveteRoute>
        },
      ]
    },
    {
      path:'/dashboard',
      element: <PriveteRoute><AdminRoutes><DashBoard/></AdminRoutes></PriveteRoute>,
      children:[
        {
          index: true,
          element: <AdminRoutes><DashboardHome/></AdminRoutes>
        },
        {
          path:'add-publisher',
          element: <AdminRoutes><AddPublisher/></AdminRoutes>
        },
        {
          path:'all-articles',
          element: <AdminRoutes><AllArticles/></AdminRoutes>
        },
        {
          path:'make-admin',
          element: <AdminRoutes><MakeAdmin/></AdminRoutes>
        },
      ]
    }
  ]);