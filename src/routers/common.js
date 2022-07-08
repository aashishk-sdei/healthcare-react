import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import BlogOverview from "../views/BlogOverview";
import AddNewPost from "../views/AddNewPost";
import ComponentsOverview from "../views/ComponentsOverview";
import Tables from "../views/Tables";
import BlogPosts from "../views/BlogPosts";
import Communication from "../views/Communication";
import TableComponent from "../views/Tablecomponent";
import ComingSoon from "../components/common/ComingSoon/ComingSoon";
import Test from '../components/test';

import { Auth } from "./../auth";
const CommonRoutes = [
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview,
    auth: Auth
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/coming-soon1",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon2",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon3",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon4",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon5",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon6",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon7",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/coming-soon8",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/communication",
    layout: DefaultLayout,
    component: Communication
  },
  {
    path: "/TableComponent",
    layout: DefaultLayout,
    component: TableComponent
  }
];

export default CommonRoutes;