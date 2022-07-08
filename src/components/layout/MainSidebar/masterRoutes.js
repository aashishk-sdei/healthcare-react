import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink, Collapse } from "shards-react";
import ICDRoutes from './icdRoutes';
import { set_active_sub_menu, set_active_sub_menu_title } from './../../../context/actions/client'

const MasterRoutes = ({ _toggle }) => {
  let { group, user } = useSelector(state => state);
  const dispatch = useDispatch();

  let isSubMenuActive = useSelector(state => state.client.isSubMenuActive);
  let subMenuTitle = useSelector(state => state.client.subMenuTitle);

  let navTitle = window.location.pathname;
  let icdRoutes = ['/icd-categories', '/view-icd-categories', '/add-icd-categories', '/edit-icd-categories', '/icd', '/view-icd', '/add-icd', '/manage-icd'];
  let groupTypeRoutes = ['/group-type-list', '/view-group-type', '/add-group-type', '/manage-group-type'];
  let userTypeRoutes = ['/user-type-list', '/view-user-type', '/add-user-type', '/manage-user-type'];
  let viewRoutes = ['/view', '/views', '/add-view', '/manage-view'];
  let diseasesRoutes = ['/manage-diseases-list', '/view-manage-diseases', '/add-manage-diseases', '/edit-manage-diseases'];
  let surveycategoryRoutes = ['/survey-category-list', '/view-survey-category', '/add-survey-category', '/edit-survey-category'];
  let languageRoutes = ['/language-list', '/view-language', '/add-language', '/edit-language'];
  let labelRoutes = ['/label-list', '/view-label', '/add-label', '/edit-label'];

  return (
    <>
      {user.role === 3 ?
        group.details.modules &&
        group.details.modules.length &&
        group.details.modules.map((item, idx) => {
          return (
            <>
              <>{item.moduleName === 'Manage Group Type' && item.status === 1 ?
                <NavLink className={groupTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={async () => _toggle('Masters')} to='/group-type-list'>Manage Group Type</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage User Type' && item.status === 1 ?
                <NavLink className={userTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={async () => _toggle('Masters')} to='/user-type-list'>Manage User Type</NavLink>
                : null}
              </>
              <>{item.moduleName === 'ICD' && item.status === 1 ?
                <>
                  <NavLink className={icdRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
                    let isActive = subMenuTitle !== 'ICD' ? true : !isSubMenuActive
                    dispatch(set_active_sub_menu(isActive));
                    dispatch(set_active_sub_menu_title('ICD'));
                  }} to={{}}>Manage ICD Codes
                {subMenuTitle === 'ICD' && isSubMenuActive ?
                      <div
                        className="d-inline-block item-icon-wrapper"
                        dangerouslySetInnerHTML={{ __html: '<i class="material-icons">keyboard_arrow_down</i>' }}
                      />
                      :
                      <div
                        className="d-inline-block item-icon-wrapper"
                        dangerouslySetInnerHTML={{ __html: '<i class="material-icons">keyboard_arrow_right</i>' }}
                      />
                    }
                  </NavLink>
                  <Collapse open={(subMenuTitle === 'ICD' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
                    <ICDRoutes />
                  </Collapse>
                </>
                : null}
              </>
              <>{item.moduleName === 'Manage Views' && item.status === 1 ?
                <NavLink className={viewRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/view'>Manage Views</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Diseases' && item.status === 1 ?
                <NavLink className={diseasesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/manage-diseases-list'>Manage Diseases</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Survey Category' && item.status === 1 ?
                <NavLink className={surveycategoryRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/survey-category-list'>Manage Survey Categories</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Language' && item.status === 1 ?
                <NavLink className={languageRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/language-list'>Manage Language</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Manage Label' && item.status === 1 ?
                <NavLink className={labelRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/label-list'>Manage Label</NavLink>
                : null}
              </>
            </>
          )
        })
        :
        <>
          <NavLink className={groupTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={async () => _toggle('Masters')} to='/group-type-list'>Manage Group Type</NavLink>
          <NavLink className={userTypeRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={async () => _toggle('Masters')} to='/user-type-list'>Manage User Type</NavLink>
          <NavLink className={icdRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
            let isActive = subMenuTitle !== 'ICD' ? true : !isSubMenuActive
            dispatch(set_active_sub_menu(isActive));
            dispatch(set_active_sub_menu_title('ICD'));
          }} to={{}}>Manage ICD Codes
            {subMenuTitle === 'ICD' && isSubMenuActive ?
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: '<i class="material-icons">keyboard_arrow_down</i>' }}
              />
              :
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: '<i class="material-icons">keyboard_arrow_right</i>' }}
              />
            }

          </NavLink>
          <Collapse open={(subMenuTitle === 'ICD' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
            <ICDRoutes />
          </Collapse>
          <NavLink className={viewRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/view'>Manage Views</NavLink>
          <NavLink className={diseasesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/manage-diseases-list'>Manage Diseases</NavLink>
          <NavLink className={surveycategoryRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/survey-category-list'>Manage Survey Categories</NavLink>
          <NavLink className={languageRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/language-list'>Manage Language</NavLink>
          <NavLink className={labelRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => _toggle('Masters')} to='/label-list'>Manage Label</NavLink>
        </>
      }
    </>
  )
}

export default MasterRoutes;
