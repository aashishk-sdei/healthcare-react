import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Users Route Views
import staffList from '../containers/staff/staffList';
import addStaff from '../containers/staff/addStaff/addStaff';


const StaffRoutes = [
  {
    path: "/add-staff",
    exact: true,
    layout: DefaultLayout,
    component: addStaff
  },
  {
    path: "/staff-list",
    exact: true,
    layout: DefaultLayout,
    component: staffList
  },
  {
    path: "/manage-staff",
    exact: true,
    layout: DefaultLayout,
    component: addStaff
  },
  {
    path: "/view-staff",
    exact: true,
    layout: DefaultLayout,
    component: addStaff
  }
];

export default StaffRoutes;
