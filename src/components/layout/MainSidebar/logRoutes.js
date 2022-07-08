import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const LogRoutes = ({ _toggle }) => {
  let navTitle = window.location.pathname;
  let logsModuleRoutes = ['/audit-logs'];
  return (
    <>
      <NavLink className={logsModuleRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Logs')} to='/audit-logs'>Manage Audit Logs</NavLink>
    </>
  )
}

export default LogRoutes;