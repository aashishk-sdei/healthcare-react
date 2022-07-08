import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import ManageViewForm from "./components/manageViewForm";
import { create_view, update_view } from '../../context/actions/view';

const AddManageView = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("views");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));

  let details = useSelector(state => state.view.records && isAdd && state.general.param1 && state.general.param1 != '' && state.view.records.find(item => item['@rid'] === state.general.param1));
  let flag = match.params.id && match.params.id != '' ? false : true;
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_view(data, result => {
        if (result.messageID === 200) {
          history.push('/view');
        }
      }));
    } else {
      dispatch(create_view(data, result => {
        if (result.messageID === 200) history.push('/view');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/view')} title={details ? isView ? 'Manage View' : 'Edit Manage View' : 'Add Manage View Form'} />
      <Row>
        <Col lg="12">
          <ManageViewForm title="Manage View Information" details={details} editable={!isView} flag={flag} submitData={(val) => _submitData(val)} cancel={() => history.push('/view')} />
        </Col>
      </Row>
    </>
  )
};

export default AddManageView;
