import React from "react";
import { Redirect } from "react-router-dom";
// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import MasterModuleList from "../containers/masterModule/masterModuleList";
import AddMasterModule from "../containers/masterModule/addMasterModule";


const MasterModuleRoutes = [
  {
    path: "/add-master-module",
    exact: true,
    layout: DefaultLayout,
    component: AddMasterModule
  },
  {
    path: "/manage-master-module",
    exact: true,
    layout: DefaultLayout,
    component: AddMasterModule
  },
  {
    path: "/view-master-module",
    exact: true,
    layout: DefaultLayout,
    component: AddMasterModule
  },
  {
    path: "/master-module",
    exact: true,
    layout: DefaultLayout,
    component: MasterModuleList
  }
];
export default MasterModuleRoutes;
