import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

// Layout Types
import { PrivateLayout } from "../layouts";

// Route Views
import Login from '../containers/auth/login';
import ForgotPassword from '../containers/auth/forgot-password';
import ResetPassword from './../containers/auth/reset-password';
import Register from '../containers/auth/register';

const AuthRoutes =
  // () => {
  //   let user = useSelector(state => state.user);
  //   console.log("user: ", user);
  //   return ([
  [
    {
      path: "/",
      exact: true,
      layout: PrivateLayout,
      component: () => <Redirect to="/login" />
    },
    {
      path: "/login",
      layout: PrivateLayout,
      component: Login
    },
    {
      path: "/forgot-password",
      layout: PrivateLayout,
      component: ForgotPassword
    },
    {
      path: "/reset-password",
      layout: PrivateLayout,
      component: ResetPassword
    },
    {
      path: "/register",
      layout: PrivateLayout,
      component: Register
    }
  ];


export default AuthRoutes;