import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";
import { useSelector } from 'react-redux';

const CarePathwayRoutes = ({ _toggle }) => {
  let { group, user } = useSelector(state => state);
  let navTitle = window.location.pathname;
  let carePathRoutes = ['/care-path-list', '/view-care-path', '/add-care-path', '/edit-care-path'];
  let diagnosisRoutes = ['/diagnosis-list', '/view-diagnosis', '/add-diagnosis', '/edit-diagnosis'];
  let problemRoutes = ['/problem-list', '/view-problem', '/add-problem', '/edit-problem'];
  let goalRoutes = ['/goal-list', '/view-goal', '/add-goal', '/edit-goal'];
  let interventionRoutes = ['/intervention-list', '/view-intervention', '/add-intervention', '/edit-intervention'];

  return (
    <>
      {user.role === 3 ?
        group.details.modules &&
        group.details.modules.length &&
        group.details.modules.map((item, idx) => {
          return (
            <>
              <>{item.moduleName === 'Care Pathway' && item.status === 1 ?
                <NavLink className={carePathRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/care-path-list'>Manage Care Pathway</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Diagnosis' && item.status === 1 ?
                <NavLink className={diagnosisRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/diagnosis-list'>Magage Diagnosis</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Problems' && item.status === 1 ?
                <NavLink className={problemRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/problem-list'>Manage Problems</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Goals' && item.status === 1 ?
                <NavLink className={goalRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/goal-list'>Manage Goals</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Interventions' && item.status === 1 ?
                <NavLink className={interventionRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/intervention-list'>Manage Interventions</NavLink>
                : null}
              </>
            </>
          )
        })
        :
        <>
          <NavLink className={carePathRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/care-path-list'>Manage Care Pathway</NavLink>
          <NavLink className={diagnosisRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/diagnosis-list'>Magage Diagnosis</NavLink>
          <NavLink className={problemRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/problem-list'>Manage Problems</NavLink>
          <NavLink className={goalRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/goal-list'>Manage Goals</NavLink>
          <NavLink className={interventionRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Care Pathway')} to='/intervention-list'>Manage Interventions</NavLink>
        </>
      }
    </>
  )
}

export default CarePathwayRoutes;