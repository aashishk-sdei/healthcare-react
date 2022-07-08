import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink, Collapse } from "shards-react";
import MasterRoutes from './masterRoutes';
import EnrollmentRoutes from './enrollmentRoutes';
import CarePathwayRoutes from './carePathwayRoutes';
import ContentRoutes from './contentRoutes';
import DevelopersOnlyRoutes from './developersOnlyRoutes';
import LogRoutes from './logRoutes';
import { set_active_nev, set_active_main_menu, set_active_menu_title } from './../../../context/actions/client'

const SidebarNavItem = ({ item }) => {
  const dispatch = useDispatch();
  // let { group, user } = useSelector(state => state);
  let activeNav = useSelector(state => state.client.isActive);
  const [collapse, setCollapse] = useState(activeNav);

  let isMenuActive = useSelector(state => state.client.isMenuActive);
  let menuTitle = useSelector(state => state.client.menuTitle);
  const toggle = (val) => {
    // setCollapse(val);
    setCollapse(collapse ? '' : val);
    dispatch(set_active_nev(val, result => {
      setCollapse(result);
    }));
  }

  const isRouteChild = (item.title === 'Masters' || item.title === 'Enrollments' || item.title === 'Care Pathway' || item.title === 'Content' || item.title === 'Developers Only' || item.title === 'Logs');
  const DisabledRoute = item.title === 'Masters' || item.title === 'Enrollments' || item.title === 'Care Pathway' || item.title === 'Content' || item.title === 'Developers Only' || item.title === 'Logs';

  return (
    <>
      <NavItem className={isRouteChild ? 'noRouterItem' : ''}>
        <NavLink tag={RouteNavLink} to={isRouteChild ? {} : item.to} className={isRouteChild ? menuTitle === item.title ? 'collapseBtnActive custom-main-menu' : 'collapseBtn custom-main-menu' : ' custom-main-menu'} onClick={() => {
          let isActive = menuTitle !== item.title ? true : !isMenuActive
          // onActiveMainMenu(isActive, item.title);
          dispatch(set_active_main_menu(isActive))
          dispatch(set_active_menu_title(item.title))
          toggle(isRouteChild ? item.title : '');
        }} title={DisabledRoute || isRouteChild ? "Coming soon" : item.title}>
          {item.htmlBefore && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
            />
          )}
          {item.title && <span>{item.title}</span>}
          {item.htmlAfter && (
            <div
              className={"d-inline-block " + (isMenuActive ? "item-icon-wrapper-down" : "item-icon-wrapper-right")}
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>

        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Masters' ? <MasterRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Enrollments' ? <EnrollmentRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Care Pathway' ? <CarePathwayRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Content' ? <ContentRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Developers Only' ? <DevelopersOnlyRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
        <Collapse open={(menuTitle === item.title && isMenuActive) ? true : false} className="navSubList">
          {item.title === 'Logs' ? <LogRoutes _toggle={(val) => toggle(val)} /> : ''}
        </Collapse>
      </NavItem>
    </>
  );
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
