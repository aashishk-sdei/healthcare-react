import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const CMSRoutes = () => {

  let navTitle = window.location.pathname;
  let emailTypeRoutes = ['/email-type-list', '/view-email-type', '/add-email-type', '/edit-email-type'];
  let emailTemplateRoutes = ['/email-template-list', '/view-email-template', '/add-email-template', '/edit-email-template'];
  let contentPagesRoutes = ['/content-page-list', '/view-content-page', '/add-content-page', '/edit-content-page'];

  return (
    <>
      <NavLink className={emailTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/email-type-list'>Email Type</NavLink>
      <NavLink className={emailTemplateRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/email-template-list'>Email Template</NavLink>
      <NavLink className={contentPagesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/content-page-list'>Manage Content Pages</NavLink>
    </>
  )
}

export default CMSRoutes;