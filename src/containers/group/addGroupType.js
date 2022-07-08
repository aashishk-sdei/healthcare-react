import React from "react";
import { useDispatch } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import GroupTypeForm from "../../components/groupType/groupTypeForm";
import { create_group_type } from '../../context/actions/groupType';

const AddGroup = ({ history }) => {
  const dispatch = useDispatch();

  const _submitData = (data) => {
    dispatch(create_group_type(data, (result) => {
      if (result.messageID === 201) {
        history.push('/group-type-list');
      }
    }));
  }

  return (
    <>
      <PageHeader button={false} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/group-type-list')} title="Add Group Type" />
      <Row>
        <Col lg="12">
          <GroupTypeForm title="Add Group Type" submitData={(data) => _submitData(data)} cancel={() => history.push('/group-type-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddGroup;
