import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import QuestionForm from "../components/questionForm";
import { create_question, update_question, get_language, list_question_category, list_question } from '../../../context/actions/questionnaire';
import { pagination, sorting } from '../../../utils/constants';

const AddQuestion = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_question_category({ sortBy: 1, sortKey: 'categoryName', limit: pagination.maxlimit }));
    dispatch(list_question({ sortBy: 1, sortKey: 'question', limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));

  let details = useSelector(state => state.questionnaire.question.records && state.questionnaire.question.records.length && isAdd && state.general.param1 && state.general.param1 != '' && state.questionnaire.question.records.find(item => item['@rid'] === state.general.param1));
  let categories = useSelector(state => state.questionnaire.questioncategory.records && state.questionnaire.questioncategory.records.filter(item => { if ((details && item.id === details.parentId) || (item['@rid'] !== `#${match.params.id}` && item.status == 1)) { item['categoryName'] = item['categoryName'].length > 110 ? `${item['categoryName'].substring(0, 110)}...` : item['categoryName']; return item; } }));
  let questions = useSelector(state => state.questionnaire.question.records.length && state.questionnaire.question.records.filter(item => { if (item['@rid'] !== `#${match.params.id}` && item.status == 1) { item['question'] = item['question'].length > 110 ? `${item['question'].substring(0, 110)}...` : item['question']; return item } })) || [];
  let Language = useSelector(state => state.general.language) || [];
  questions.unshift({ 'question': 'Primary', 'id': 0 });

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_question(data, result => {
        if (result.messageID === 200) {
          history.push('/question-list');
        }
      }));
    } else {
      dispatch(create_question(data, result => {
        if (result.messageID === 200) history.push('/question-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/question-list')} title={details ? isView ? 'Question' : 'Edit Question' : 'Add Question'} />
      <Row>
        <Col lg="12">
          <QuestionForm title="Question Information" details={details} categories={categories} Language={Language} questions={questions} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/question-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddQuestion;
