import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList2 from '../../../../../components/common/TableList/TableList2';
import { list_assigned_questionnaire, create_assigned_questionnaire } from '../../../../../context/actions/assignedQuestionnaire';

const AssignedQuestionnaireList = ({ match, history }) => {
  const dispatch = useDispatch();
  const general = useSelector(state => state.general);
  let lession = useSelector(state => state.program.lession.records.length && state.program.lession.records.find(item => item && item['@rid'] === general.param2));
  const lessionName = lession.name;

  useEffect(() => {
    lession = JSON.parse(lession['questionnaires']);
    const questionnaireIds = lession.map(item => item.quest_id);
    dispatch(list_assigned_questionnaire({ ids: questionnaireIds, lesson_id: general.param2 }));
  }, []);

  let assignedQuestionnaireList = useSelector(state => state.questionnaire.assignedQuestionnaire.records);

  const handleUpdateQuestionnaire = async (data) => {
    data['lesson_id'] = general.param2;
    dispatch(create_assigned_questionnaire(data));
  }

  return (
    <>
      <TableList2
        list={assignedQuestionnaireList}
        count={assignedQuestionnaireList.length}
        lession={lessionName}
        programId={general.param1 ? general.param1 : ''}
        type={'Assigned Questionnaire'}
        handleSubmit={(data) => handleUpdateQuestionnaire(data)}
        history={history}
      />
    </>
  )
};

export default AssignedQuestionnaireList;
