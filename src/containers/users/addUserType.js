import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import UserTypeForm from "../../components/userType/userTypeForm";
import { create_user_type } from './../../context/actions/userType';
import { list_data } from './../../context/actions/modules';
import { list_view } from './../../context/actions/view';
import { pagination, sorting } from './../../utils/constants';

const AddUser = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_data({ sortBy: sorting.sortby, sortKey: sorting.sortkey, search: '', limit: pagination.maxlimit, page: pagination.page }));
    dispatch(list_view({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: pagination.page }));
  }, []);

  let modules = useSelector(state => state.modules.records && state.modules.records.filter(item => item.status === 1)) || [];
  let views = useSelector(state => state.view.records && state.view.records.filter(item => item.status == 1));
  const _submitData = (data) => {
    dispatch(create_user_type(data, (result) => {
      if (result.messageID === 201) history.push('/user-type-list');
    }));
  }

  return (
    <>
      <PageHeader button={false} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/user-type-list')} title="Add User Type" />
      <Row>
        {/*  <Col lg="4">
          <UserDetails details={userDetails} />
        </Col> */}
        <Col lg="12">
          <UserTypeForm title="Add User Type" views={views} modules={modules} editable={true} submitData={(data) => _submitData(data)} cancel={() => history.push('/user-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddUser;
