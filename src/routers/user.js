import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Users Route Views
import UseTypeTList from "../containers/users/userTypeList/userTypeList";
import UserProfileLite from "../views/UserProfileLite";
import UserProfile from "../containers/users/UserProfile";
import AddUserType from "../containers/users/addUserType";
const UserRoutes = [
  {
    path: "/add-user-type",
    exact: true,
    layout: DefaultLayout,
    component: AddUserType
  },
  {
    path: "/user-type-list",
    exact: true,
    layout: DefaultLayout,
    component: UseTypeTList
  },
  {
    path: "/manage-user-type",
    exact: true,
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/view-user-type",
    exact: true,
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  }
];

export default UserRoutes;
