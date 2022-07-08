import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import MasterModuleForm from "./components/masterModuleForm";
import { create, list_db_collections } from '../../context/actions/modules';
import { modules } from '../../utils/constants';

const AddMasterModule = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_db_collections());
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let details = useSelector(state => state.modules.records && isAdd && state.general.param1 && state.general.param1 != '' && state.modules.records.find(item => item['@rid'] === state.general.param1));
  let collections = useSelector(state => state.modules.collections && state.modules.collections);

  let flag = match.params.id && match.params.id != '' ? false : true;
  const _submitData = async (data) => {
    dispatch(create(data, result => {
      if (result.messageID === 201) history.push('/master-module');
    }));
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/master-module')} title={details ? isView ? 'Master Module' : 'Edit Master Module' : 'Add Master Module Form'} />
      <Row>
        <Col lg="12">
          <MasterModuleForm title="Master Module Information" collections={collections} details={details} modules={modules} flag={flag} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/master-module')} />
        </Col>
      </Row>
    </>
  )
};

export default AddMasterModule;
