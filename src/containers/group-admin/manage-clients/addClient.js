import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ClientForm from "../../../components/client/clientForm";
import ClientDetails from "../../../components/client/clientDetails";
import { add_client, update_client } from '../../../context/actions/client';
import { list_group } from '../../../context/actions/group';
import { pagination, sorting } from '../../../utils/constants';


const AddClient = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_group({ sortBy: sorting.sortby, sortKey: sorting.sortkey, search: '', limit: 100, page: pagination.page }));
  }, []);


  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("manage"));

  let clientdetails = useSelector(state => state.client.records && isAdd && state.general.param1 && state.general.param1 != '' && state.client.records.find(item => item['@rid'] === state.general.param1));
  let userdata = useSelector(state => state.user);
  let roleId = userdata.role
  let group = useSelector(state => state.group.records);

  let [flag, setFlag] = useState(false);
  let [clientPayload, setclientPayload] = useState(false);

  const _primaryContact = (data) => {
    setclientPayload({ ...data });
    if (data) setFlag(!flag);
  }
  const _submitData = async (data) => {
    const payload = { ...clientPayload, ...data };
    setclientPayload(payload)
    if (payload['recordId'] && payload['recordId'] !== '') {
      await dispatch(update_client(payload));
      history.push('/client-list');
    } else {
      dispatch(add_client(payload, (result) => {
        if (result.messageID === 201) history.push('/client-list');
      }));
    }
  }

  return (
    <>
      {/* <PageHeader button={true} buttonLabel='Back' clickEvent={() => history.push('/client-list')} title={clientdetails ? isView ? 'Client' : 'Edit Client' : 'Add Client'} subtitle=" " /> */}
      <PageHeader button={clientdetails && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/client-list')} title={clientdetails ? isView ? 'Client' : 'Edit Client' : 'Add Client Form'} />
      <Row>
        <Col lg="8">
          <ClientForm title="Client Information" details={clientdetails} roleId={roleId} group={group} flag={isView ? flag : !flag} editable={!isView} isNext={(val) => _primaryContact(val)} cancel={() => history.push('/client-list')} makeEditale={() => setFlag(!flag)} />
        </Col>
        <Col lg="4">
          <ClientDetails title="Primary Contact" details={clientdetails} flag={flag} submitData={(data) => _submitData(data)} cancel={() => history.push('/client-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddClient;
