import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const ICDRoutes = () => {

  let navTitle = window.location.pathname;
  let icdCategoryRoutes = ['/icd-categories', '/view-icd-categories', '/add-icd-categories', '/edit-icd-categories'];
  let icdRoutes = ['/icd', '/view-icd', '/add-icd', '/manage-icd'];

  return (
    <>
      <NavLink className={icdCategoryRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/icd-categories'>Manage ICD Categories</NavLink>
      <NavLink className={icdRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/icd'>Manage ICD Codes</NavLink>
    </>
  )
}

export default ICDRoutes;
