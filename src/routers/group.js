import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import GroupList from "../containers/group/manage-group/groupList/groupList";
import AddGroup from "../containers/group/manage-group/groupList/addGroup";


const GroupRoutes = [
  {
    path: "/add-group",
    exact: true,
    layout: DefaultLayout,
    component: AddGroup
  },
  {
    path: "/manage-group",
    exact: true,
    layout: DefaultLayout,
    component: AddGroup
  },
  {
    path: "/view-group",
    exact: true,
    layout: DefaultLayout,
    component: AddGroup
  },
  {
    path: "/group-list",
    exact: true,
    layout: DefaultLayout,
    component: GroupList
  }
];
export default GroupRoutes;
