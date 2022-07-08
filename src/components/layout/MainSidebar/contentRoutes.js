import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink, Collapse } from "shards-react";
import QuestionnaireRoutes from './questionnaireRoutes';
import ProgramRoutes from './programRoutes';
import CMSRoutes from './cmsRoutes';
import { set_active_sub_menu, set_active_sub_menu_title } from './../../../context/actions/client'

const ContentRoutes = ({ _toggle }) => {
  let { group, user } = useSelector(state => state);
  const dispatch = useDispatch();
  let isSubMenuActive = useSelector(state => state.client.isSubMenuActive);
  let subMenuTitle = useSelector(state => state.client.subMenuTitle);

  let navTitle = window.location.pathname;
  let questionCategoriesRoutes = ['/question-categories', '/view-question-categories', '/add-question-categories', '/edit-question-categories', '/question-list', '/view-question', '/add-question', '/edit-question', '/questionnaire-list', '/view-questionnaire', '/add-questionnaire', '/edit-questionnaire'];
  let educationProgramRoutes = ['/program-type-list', '/view-program-type', '/add-program-type', '/edit-program-type', '/program-list', '/view-program', '/add-program', '/edit-program', '/knowledge-category', '/view-knowledge-category', '/add-knowledge-category', '/edit-knowledge-category', '/knowledge', '/view-knowledge', '/add-knowledge', '/edit-knowledge'];
  let cmsRoutes = ['/email-type-list', '/view-email-type', '/add-email-type', '/edit-email-type', '/email-template-list', '/view-email-template', '/add-email-template', '/edit-email-template', '/content-page-list', '/view-content-page', '/add-content-page', '/edit-content-page'];

  return (
    <>
      {user.role === 3 ?
        group.details.modules &&
        group.details.modules.length &&
        group.details.modules.map((item, idx) => {
          return (
            <>
              <>{item.moduleName === 'Questionnaire' && item.status === 1 ?
                <>
                  <NavLink className={questionCategoriesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
                    let isActive = subMenuTitle !== 'Questionnaire' ? true : !isSubMenuActive
                    dispatch(set_active_sub_menu(isActive));
                    dispatch(set_active_sub_menu_title('Questionnaire'));
                  }} to={{}}>Questionnaire
                  {subMenuTitle === 'Questionnaire' && isSubMenuActive ?
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
                  <Collapse open={(subMenuTitle === 'Questionnaire' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
                    <QuestionnaireRoutes />
                  </Collapse>
                </>
                : null}
              </>
              <>{item.moduleName === 'Education Program' && item.status === 1 ?
                <>
                  <NavLink className={educationProgramRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
                    let isActive = subMenuTitle !== 'Education Program' ? true : !isSubMenuActive
                    dispatch(set_active_sub_menu(isActive));
                    dispatch(set_active_sub_menu_title('Education Program'));
                  }} to={{}}>Education Program
                 {subMenuTitle === 'Education Program' && isSubMenuActive ?
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
                  <Collapse open={(subMenuTitle === 'Education Program' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
                    <ProgramRoutes />
                  </Collapse>
                </>
                : null}
              </>
              <>{item.moduleName === 'Location' && item.status === 1 ?
                <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon6'>Location</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Algorithm Builder' && item.status === 1 ?
                <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon3'>Algorithm Builder</NavLink>
                : null}
              </>
              <>{item.moduleName === 'CMS' && item.status === 1 ?
                <>
                  <NavLink className={cmsRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
                    let isActive = subMenuTitle !== 'CMS' ? true : !isSubMenuActive
                    dispatch(set_active_sub_menu(isActive));
                    dispatch(set_active_sub_menu_title('CMS'));
                  }} to={{}}>Content Management
                 {subMenuTitle === 'CMS' && isSubMenuActive ?
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
                  <Collapse open={(subMenuTitle === 'CMS' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
                    <CMSRoutes />
                  </Collapse>
                </>
                : null}
              </>
              <>{item.moduleName === 'Event Engine' && item.status === 1 ?
                <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon4'>Event Engine</NavLink>
                : null}
              </>
              <>{item.moduleName === 'Engagement Tools' && item.status === 1 ?
                <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon5'>Engagement Tools</NavLink>
                : null}
              </>
            </>
          )
        })
        :
        <>
          <NavLink className={questionCategoriesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
            let isActive = subMenuTitle !== 'Questionnaire' ? true : !isSubMenuActive
            dispatch(set_active_sub_menu(isActive));
            dispatch(set_active_sub_menu_title('Questionnaire'));
          }} to={{}}>Questionnaire
          {subMenuTitle === 'Questionnaire' && isSubMenuActive ?
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
          <Collapse open={(subMenuTitle === 'Questionnaire' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
            <QuestionnaireRoutes />
          </Collapse>
          <NavLink className={educationProgramRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
            let isActive = subMenuTitle !== 'Education Program' ? true : !isSubMenuActive
            dispatch(set_active_sub_menu(isActive));
            dispatch(set_active_sub_menu_title('Education Program'));
          }} to={{}}>Education Program
           {subMenuTitle === 'Education Program' && isSubMenuActive ?
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
          <Collapse open={(subMenuTitle === 'Education Program' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
            <ProgramRoutes />
          </Collapse>
          <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon6'>Location</NavLink>
          <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon3'>Algorithm Builder</NavLink>
          <NavLink className={cmsRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} onClick={() => {
            let isActive = subMenuTitle !== 'CMS' ? true : !isSubMenuActive
            dispatch(set_active_sub_menu(isActive));
            dispatch(set_active_sub_menu_title('CMS'));
          }} to={{}}>Content Management
            {subMenuTitle === 'CMS' && isSubMenuActive ?
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
          <Collapse open={(subMenuTitle === 'CMS' && isSubMenuActive) ? true : false} className="navSubList custom-sub-menu">
            <CMSRoutes />
          </Collapse>
          <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon4'>Event Engine</NavLink>
          <NavLink tag={RouteNavLink} onClick={() => _toggle('Content')} to='/coming-soon5'>Engagement Tools</NavLink>
        </>
      }
    </>
  )
}

export default ContentRoutes;
