import React from 'react';
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

const QuestionnaireRoutes = () => {

  let navTitle = window.location.pathname;
  let questionCategoriesRoutes = ['/question-categories', '/view-question-categories', '/add-question-categories', '/edit-question-categories'];
  let questionsRoutes = ['/question-list', '/view-question', '/add-question', '/edit-question'];
  let questionnaireRoutes = ['/questionnaire-list', '/view-questionnaire', '/add-questionnaire', '/edit-questionnaire'];

  return (
    <>
      <NavLink className={questionCategoriesRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/question-categories'>Manage Question Category</NavLink>
      <NavLink className={questionsRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/question-list'>Manage Questions</NavLink>
      <NavLink className={questionnaireRoutes.includes(navTitle) ? 'active' : ''} tag={RouteNavLink} to='/questionnaire-list'>Manage Questionnaire</NavLink>
    </>
  )
}

export default QuestionnaireRoutes;