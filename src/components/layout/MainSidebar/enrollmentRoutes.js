import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { NavLink } from "shards-react";

const EnrollmentRoutes = ({ _toggle }) => {
  let { group, user } = useSelector(state => state);
  let navTitle = window.location.pathname;
  let groupRoutes = ['/group-list', '/view-group', '/add-group', '/manage-group'];
  let clientRoutes = ['/client-list', '/view-client', '/add-client', '/manage-client'];
  let staffRoutes = ['/staff-list', '/view-staff', '/add-staff', '/manage-staff'];
  let censusRoutes = ['/census-list', '/add-census'];

  return (
    <>
      {user.role === 3 ?
        group.details.modules &&
        group.details.modules.length &&
        group.details.modules.map((item, idx) => {
          return (
            <>
              <>{item.moduleName === 'Manage Groups' && item.status === 1 ?
                <NavLink className={groupRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/group-list'>Manage Groups</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Client' && item.status === 1 ?
                <NavLink className={clientRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/client-list'>Manage Clients</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Staff' && item.status === 1 ?
                <NavLink className={staffRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/staff-list'>Manage Staffs</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Census' && item.status === 1 ?
                <NavLink className={censusRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/census-list'>Manage Census</NavLink>
                : null}
              </>
            </>
          )
        })
        :
        <>
          <NavLink className={groupRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/group-list'>Manage Groups</NavLink>
          <NavLink className={clientRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/client-list'>Manage Clients</NavLink>
          <NavLink className={staffRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/staff-list'>Manage Staffs</NavLink>
          <NavLink className={censusRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Enrollments')} to='/census-list'>Manage Census</NavLink>
        </>
      }
    </>
  )
}

export default EnrollmentRoutes;
