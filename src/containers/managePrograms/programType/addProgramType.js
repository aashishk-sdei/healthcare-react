import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ProgramTypeForm from "../components/programTypeForm";
import { create_program_type, list_program_type, update_program_type, get_language } from '../../../context/actions/program';
import { pagination, sorting } from '../../../utils/constants';

const AddProgramType = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_program_type({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let details = useSelector(state => state.program.programtype.records && isAdd && state.general.param1 && state.general.param1 != '' && state.program.programtype.records.find(item => item['@rid'] === state.general.param1));
  let Language = useSelector(state => state.general.language) || [];

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_program_type(data, result => {
        if (result.messageID === 200) {
          history.push('/program-type-list');
        }
      }));
    } else {
      dispatch(create_program_type(data, result => {
        if (result.messageID === 201) history.push('/program-type-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/program-type-list')} title={details ? isView ? 'Program Type' : 'Edit Program Type' : 'Add Program Type'} />
      <Row>
        <Col lg="12">
          <ProgramTypeForm title="Program Type Information" details={details} Language={Language} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/program-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddProgramType;
