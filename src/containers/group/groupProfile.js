import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";

import PageHeader from '../../components/common/PageHeader/PageHeader';
import GroupTypeForm from "../../components/groupType/groupTypeForm";
import { update_group_type } from '../../context/actions/groupType';


const GroupProfile = ({ match, history }) => {
  const dispatch = useDispatch();

  let grouptypedetails = useSelector(state => state.groupType.records && state.groupType.records.find(item => item['@rid'] === state.general.param1));
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));

  if (grouptypedetails) grouptypedetails['avatar'] = require("../../images/avatars/0.jpg");

  const _submitData = async (data) => {
    await dispatch(update_group_type(data, result => {
      if (result.messageID === 200) {
        history.push('/group-type-list');
      }
    }));
  }

  return (
    <>
      <PageHeader button={grouptypedetails && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/group-type-list')} title={grouptypedetails && isView ? 'Group Type' : 'Edit Group Type'} />
      <Row>
        <Col lg="12">
          <GroupTypeForm title={grouptypedetails && isView ? "Group Type" : "Edit Group Type"} editable={!isView} details={grouptypedetails} submitData={(data) => _submitData(data)} cancel={() => history.push('/group-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default GroupProfile;
