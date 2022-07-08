import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Users Route Views
import clientList from '../containers/group-admin/manage-clients/clientList';
// import GroupProfile from "../containers/group-admin/manage-clients/groupProfile";
import Addclient from "../containers/group-admin/manage-clients/addClient";

const ClientsRoutes = [
  {
    path: "/add-client",
    exact: true,
    layout: DefaultLayout,
    component: Addclient
  },
  {
    path: "/client-list",
    exact: true,
    layout: DefaultLayout,
    component: clientList
  },
  {
    path: "/manage-client",
    exact: true,
    layout: DefaultLayout,
    component: Addclient
  },
  {
    path: "/view-client",
    exact: true,
    layout: DefaultLayout,
    component: Addclient
  }
];

export default ClientsRoutes;
