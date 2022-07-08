import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ProgramForm from "../components/programForm";
import { set_active_tab, create_education, update_education, list_lession, list_education, create_program, list_program_type, list_program, update_program, get_language } from '../../../context/actions/program';
import { create_condition, list_condition } from '../../../context/actions/condition';
import { pagination, sorting } from '../../../utils/constants';

const AddProgram = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_program_type({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
    dispatch(list_program({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
    dispatch(list_condition({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
    dispatch(list_lession({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_education({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  const activeTab = useSelector(state => state.general.activeTab) || '1';
  let details = useSelector(state => state.program.records && isAdd && state.general.param1 && state.general.param1 !== '' && state.program.records.find(item => item['@rid'] === state.general.param1));
  let education = useSelector(state => state.program.education.records.length ? state.program.education.records.find(item => item['program'] === state.general.param1) : { lessonArr: false });
  let LessionsSelected = education ? JSON.parse(education.lessonArr) : [];
  const lessions = LessionsSelected && LessionsSelected.length ? LessionsSelected.map(item => item.rid) : [];
  let Language = useSelector(state => state.general.language) || [];

  let ProgramType = useSelector(state => state.program.programtype.records && state.program.programtype.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));

  let Program = useSelector(state => state.program.records && state.program.records.filter(item => {
    if (item.status !== 0) {
      item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item;
    }
  }));
  const programId = useSelector(state => state.general.param1);

  let Lession = useSelector(state => state.program.lession.records && state.program.lession.records.filter(item => {
    if (item.status !== 0) {
      item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item;
    }
  }));

  let LessionList = Lession.filter(item => (item.status !== 0 && lessions.findIndex(val => val === item['@rid']) > -1));
  LessionList = LessionList.map(item => { item['assignedQuestionnaire'] = JSON.parse(item['questionnaires']).length; return item; });

  if (LessionsSelected && LessionsSelected.length && Lession && Lession.length) {
    LessionsSelected = LessionsSelected.filter(item => {
      if (Lession.findIndex(val => val['@rid'] === item['rid']) > -1) return item;
    })
  }

  Lession = Lession.filter(item => item['status'] === 1);

  let Condition = useSelector(state => state.program.condition.records && state.program.condition.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));

  const _handleCondition = async (val) => {
    await dispatch(create_condition({ name: val, status: 1 }, result => {
      if (result.messageID === 201) dispatch(list_condition({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
    }));
  }

  const _submitData = async (data, activeTab, isContinue) => {
    if (activeTab === '1') {
      if (data['recordId'] && data['recordId'] !== '') {
        await dispatch(update_program(data.body, result => {
          if (result.messageID === 200) {
            if (isContinue.continue) { }
            // history.push(`/edit-program/${result.data[0]['@rid'].replace('#', '')}`)
            // history.push('/program-list'); // history.push(`/edit-program/${result.data[0]['@rid'].replace('#', '')}`);
            else history.push('/program-list');
          }
        }));
      } else {
        await dispatch(create_program(data.body, result => {
          if (result.messageID === 201) {
            if (isContinue.continue) history.push('/program-list');  //history.push(`/edit-program/${result.data[0]['@rid'].replace('#', '')}`);
            else history.push('/program-list');
          }
        }));
      }
    } else {
      if (education && education['@rid']) {
        data['recordId'] = education['@rid'];
        await dispatch(update_education(data, result => {
          if (result.messageID === 200) history.push('/program-list');
          dispatch(list_education({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
        }));
      } else {
        await dispatch(create_education(data, result => {
          if (result.messageID === 201) history.push('/program-list');
          // history.push(`/edit-program/:${match.params.id}`);
          dispatch(list_education({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
        }));
      }
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/program-list')} title={details ? isView ? 'Program' : 'Edit Program' : 'Add Program'} />
      <Row>
        <Col sm="12">
          <div className="mb-4 card card-small p-3">
            <ProgramForm details={details} Language={Language} ProgramType={ProgramType} Program={Program} Condition={Condition} Lession={Lession} LessionList={LessionList} LessionsSelected={LessionsSelected} editable={!isView} submitData={(val, tab, isContinue) => _submitData(val, tab, isContinue)} cancel={() => history.push('/program-list')} handleCondition={(val) => _handleCondition(val)} toggleTab={val => dispatch(set_active_tab(val))} tab={programId !== '' ? activeTab : '1'} programId={programId !== '' ? programId : ''} history={history} />
          </div>
        </Col>
      </Row>
    </>
  )
};

export default AddProgram;
