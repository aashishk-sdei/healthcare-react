import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import QuestionnaireForm from "../components/questionnaireForm";
import { list_survey_category } from '../../../context/actions/survey';
import { create_questionnaire, list_question, list_category_with_question, list_questionnaire, update_questionnaire, get_language, list_questionnaire_types } from '../../../context/actions/questionnaire';
import { list_data } from '../../../context/actions/manageDisease';
import { pagination, sorting } from '../../../utils/constants';

const AddqQuestionnaire = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_category_with_question({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: 500 }));
    dispatch(list_survey_category({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_questionnaire_types({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_data({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
    dispatch(list_questionnaire({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: 200 }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let questionnaireTypes = useSelector(state => state.questionnaire.types.records);
  let details = useSelector(state => state.questionnaire.records && isAdd && state.general.param1 && state.general.param1 != '' && state.questionnaire.records.find(item => item['@rid'] === state.general.param1));
  let diseasesList = useSelector(state => state.disease.records && state.disease.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));
  let surveyCategories = useSelector(state => state.survey.records && state.survey.records.filter(item => {
    if (item.status == 1) {
      item['categoryName'] = item['categoryName'].length > 110 ? `${item['categoryName'].substring(0, 110)}...` : item['categoryName']; return item;
    }
  }));
  let Language = useSelector(state => state.general.language) || [];
  let questionList = useSelector(state => state.questionnaire.categoryquestion.records && state.questionnaire.categoryquestion.records.map(item => { if (item.status == 1) { return item; } }));
  // item['question'] = item['questions'].length 110? `${ item['questions'].substring(0, 110) }...` : 
 
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_questionnaire(data, result => {
        if (result.messageID === 200) {
          history.push('/questionnaire-list');
        }
      }));
    } else {
      dispatch(create_questionnaire(data, result => {
        if (result.messageID === 200) history.push('/questionnaire-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/questionnaire-list')} title={details ? isView ? 'Questionnaire' : 'Edit Questionnaire' : 'Add Questionnaire'} />
      <Row>
        <Col lg="12">
          <QuestionnaireForm title="Questionnaire Information" details={details} questionList={questionList} surveyCategories={surveyCategories} diseasesList={diseasesList} questionnaireTypes={questionnaireTypes} Language={Language} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/questionnaire-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddqQuestionnaire;
