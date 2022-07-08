import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";

import PageHeader from '../../components/common/PageHeader/PageHeader';
import UserTypeForm from "../../components/userType/userTypeForm";
import { list_data } from './../../context/actions/modules';
import { list_view } from './../../context/actions/view';
import { assigned_views } from './../../context/actions/assignViews';
import { permissions } from './../../context/actions/managePermission';
import { update_user_type } from '../../context/actions/userType';
import { pagination, sorting } from './../../utils/constants';

const UserProfile = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_data({ sortBy: sorting.sortby, sortKey: sorting.sortkey, search: '', limit: 100, page: pagination.page }));
    dispatch(list_view({ sortBy: sorting.sortby, sortKey: sorting.sortkey, search: '', limit: 100, page: pagination.page }));
  }, []);
  let usertypedetails = useSelector(state => state.userType.records && state.userType.records.find(item => item['@rid'] === state.general.param1));
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let modules = useSelector(state => state.modules.records);
  let views = useSelector(state => state.view.records);
  if (usertypedetails) usertypedetails['avatar'] = require("../../images/avatars/0.jpg");
  const _submitData = async (data) => {
    await dispatch(update_user_type(data, result => {
      if (result.messageID === 200) {
        history.push('/user-type-list');
      }
    }));
  }
  return (
    <>
      <PageHeader button={usertypedetails && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/user-type-list')} title="User Type" />
      <Row>
        <Col lg="12">
          <UserTypeForm title={isView ? "User Type" : "Edit User Type"} views={views} modules={modules} editable={!isView} details={usertypedetails} submitData={(data) => _submitData(data)} cancel={() => history.push('/user-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default UserProfile;
