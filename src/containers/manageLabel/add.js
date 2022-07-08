import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import LabelForm from "./components/labelForm";
import { get_language } from '../../context/actions/questionnaire';
import { create_label, update_label, list_data } from '../../context/actions/label';
import { pagination, sorting } from '../../utils/constants';
const AddLabel = ({ match, history }) => {
  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_data({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);
  let details = useSelector(state => state.label.records && isAdd && state.general.param1 && state.general.param1 != '' && state.label.records.find(item => item['@rid'] === state.general.param1));
  let languages = useSelector(state => state.general.language) || [];
  let types = [{key:'label',name:'Label'},{key:'message',name:'Message'},{key:'text',name:'Text'}]
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_label(data, result => {
        if (result.messageID === 200) {
          history.push('/label-list');
        }
      }));
    } else {
      dispatch(create_label(data, result => {
        if (result.messageID === 200) history.push('/label-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/label-list')} title={details ? isView ? 'View Label' : 'Edit Label' : 'Add Label'} />
      <Row>
        <Col lg="12">
          <LabelForm  details={details}  editable={!isView} types={types} languages={languages} submitData={(val) => _submitData(val)} cancel={() => history.push('/label-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddLabel;
