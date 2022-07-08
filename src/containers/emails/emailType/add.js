import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import EmailTypeForm from "./../components/emailTypeForm";
import { create_email_type, update_email_type, list_email_type } from '../../../context/actions/email';
const AddEmailType = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));

  let details = useSelector(state => state.emails.emailtype.records && isAdd && state.general.param1 && state.general.param1 != '' && state.emails.emailtype.records.find(item => item['@rid'] === state.general.param1));
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_email_type(data, result => {
        if (result.messageID === 200) {
          history.push('/email-type-list');
        }
      }));
    } else {
      dispatch(create_email_type(data, result => {
        if (result.messageID === 200) history.push('/email-type-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/email-type-list')} title={details ? isView ? 'Email Type' : 'Edit Email Type' : 'Add Email Type'} />
      <Row>
        <Col lg="12">
          <EmailTypeForm title="Manage Email Type" details={details} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/email-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddEmailType;
