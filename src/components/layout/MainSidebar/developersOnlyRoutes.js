import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const DevelopersOnlyRoutes = ({ _toggle }) => {
  let navTitle = window.location.pathname;
  let masterModuleRoutes = ['/master-module', '/view-master-module', '/add-master-module'];
  return (
    <>
      <NavLink className={masterModuleRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Developers Only')} to='/master-module'>Manage Master Module</NavLink>
    </>
  )
}

export default DevelopersOnlyRoutes;