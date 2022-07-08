import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../../../components/common/PageHeader/PageHeader';
import AssignedQuestionnaireForm from "../../../../../containers/managePrograms/program/lesson/assignedQuestionnaire/components/AssignedQuestionnaireForm";
import { create_assigned_questionnaire, list_assigned_questionnaire, update_assigned_questionnaire, get_language } from '../../../../../context/actions/assignedQuestionnaire';
import { pagination, sorting } from '../../../../../utils/constants';

const AddAssignedQuestionnaire = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_assigned_questionnaire({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let details = match.params.id ? { '@rid': '#21:1', 'programName': 'Program1' } : undefined;
  // let details = useSelector(state => state.program.programtype.records && isAdd && state.general.param1 && state.general.param1 != '' && state.program.programtype.records.find(item => item['@rid'] === state.general.param1));

  let Language = useSelector(state => state.general.language) || [];

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_assigned_questionnaire(data, result => {
        if (result.messageID === 200) {
          history.push('/asigned-questionnaire-list');
        }
      }));
    } else {
      dispatch(create_assigned_questionnaire(data, result => {
        if (result.messageID === 201) history.push('/asigned-questionnaire-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/asigned-questionnaire-list')} title={details ? isView ? 'Assigned Questionnaire' : 'Edit Assigned Questionnaire' : 'Add Assigned Questionnaire'} />
      <Row>
        <Col lg="12">
          <AssignedQuestionnaireForm title="Assigned Questionnaire Information" details={details} Language={Language} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/asigned-questionnaire-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddAssignedQuestionnaire;