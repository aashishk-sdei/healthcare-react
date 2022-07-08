import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const KnowledgeBankRoutes = ({ _toggle }) => {
  return (
    <>
      <NavLink tag={RouteNavLink} onClick={() => _toggle('Knowledge Bank')} to='/knowledge-category'>Manage Knowledge Category</NavLink>
      <NavLink tag={RouteNavLink} onClick={() => _toggle('Knowledge Bank')} to='/knowledge'>Manage Knowledge Bank</NavLink>
      {/* <NavLink tag={RouteNavLink} onClick={() => _toggle('Knowledge Bank')} to='/knowledge-category'>Knowledge Category</NavLink> */}
    </>
  )
}

export default KnowledgeBankRoutes;