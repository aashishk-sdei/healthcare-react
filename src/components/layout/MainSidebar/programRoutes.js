import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const ProgramRoutes = () => {
  let navTitle = window.location.pathname;
  let programTypeRoutes = ['/program-type-list', '/view-program-type', '/add-program-type', '/edit-program-type'];
  let programRoutes = ['/program-list', '/view-program', '/add-program', '/edit-program'];
  let knowledgeCategoryRoutes = ['/knowledge-category', '/view-knowledge-category', '/add-knowledge-category', '/edit-knowledge-category'];
  let knowledgeBankRoutes = ['/knowledge', '/view-knowledge', '/add-knowledge', '/edit-knowledge'];
  return (
    <>
      <NavLink className={programTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/program-type-list'>Manage Program Type</NavLink>
      <NavLink className={programRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/program-list'>Manage Program</NavLink>
      <NavLink className={knowledgeCategoryRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/knowledge-category'>Manage Knowledge Category</NavLink>
      <NavLink className={knowledgeBankRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/knowledge'>Manage Knowledge Bank</NavLink>
    </>
  )
}

export default ProgramRoutes;