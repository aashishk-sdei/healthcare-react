import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const LocationRoutes = () => {
  return (
    <>
      {/* <NavLink tag={RouteNavLink} to='/user-type-list'> */}
      <NavLink tag={RouteNavLink} to={{}}>
        Location Category
      </NavLink>
      {/* <NavLink tag={RouteNavLink} to="/location-category"> */}
      <NavLink tag={RouteNavLink} to={{}}>
        Location Access
      </NavLink>
      <NavLink tag={RouteNavLink} to={{}}>
        Location Type
      </NavLink>
      <NavLink tag={RouteNavLink} to={{}}>
        Location Service Category
      </NavLink>
      <NavLink tag={RouteNavLink} to={{}}>
        Location Service
      </NavLink>
      {/* <NavLink tag={RouteNavLink} to='/location'> */}
      <NavLink tag={RouteNavLink} to={{}}>
        Location
      </NavLink>
      <NavLink tag={RouteNavLink} to={{}}>
        Location Admin Office
      </NavLink>
    </>
  )
}

export default LocationRoutes;
