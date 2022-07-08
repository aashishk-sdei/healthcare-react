import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Users Route Views
import LoacationCategory from "../containers/location/locationCategory/locationCategory";
import Loacation from "../containers/location/location/location";
const LocationRoutes = [
  {
    path: "/location-category",
    layout: DefaultLayout,
    component: LoacationCategory
  },
  {
    path: "/location",
    layout: DefaultLayout,
    component: Loacation
  }
];

export default LocationRoutes;
