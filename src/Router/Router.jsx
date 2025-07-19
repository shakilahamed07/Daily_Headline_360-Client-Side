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
        {
          path: '/add-articles',
          element: <PriveteRoute><AddArticle/></PriveteRoute>
        },
        {
          path: '/all-articles-page',
          element: <PriveteRoute><All_Article_Page/></PriveteRoute>
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
          element: <p>Dashboard Home</p>
        },
        {
          path:'add-publisher',
          element: <AdminRoutes><AddPublisher/></AdminRoutes>
        },
        {
          path:'all-articles',
          element: <AdminRoutes><AllArticles/></AdminRoutes>
        },
      ]
    }
  ]);