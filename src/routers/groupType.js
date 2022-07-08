import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import GroupTypeList from '../containers/group/groupTypeList/groupTypeList';
import GroupProfile from "../containers/group/groupProfile";
import AddGroup from "../containers/group/addGroupType";


const GroupTypeRoutes = [
  {
    path: "/add-group-type",
    exact: true,
    layout: DefaultLayout,
    component: AddGroup
  },
  {
    path: "/group-type-list",
    exact: true,
    layout: DefaultLayout,
    component: GroupTypeList
  },
  {
    path: "/manage-group-type",
    exact: true,
    layout: DefaultLayout,
    component: GroupProfile
  },
  {
    path: "/view-group-type",
    exact: true,
    layout: DefaultLayout,
    component: GroupProfile
  }
];
export default GroupTypeRoutes;
