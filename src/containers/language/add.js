import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import LanguageForm from "./components/addLanguageForm";
import { create_language, update_language, list_data } from '../../context/actions/language';
import { pagination, sorting } from '../../utils/constants';
const AddLanguage = ({ match, history }) => {
  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
    dispatch(list_data({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);
  let details = useSelector(state => state.language.records && isAdd && state.general.param1 && state.general.param1 != '' && state.language.records.find(item => item['@rid'] === state.general.param1));
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_language(data, result => {
        if (result.messageID === 200) {
          history.push('/language-list');
        }
      }));
    } else {
      dispatch(create_language(data, result => {
        if (result.messageID === 200) history.push('/language-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/language-list')} title={details ? isView ? 'View Language' : 'Edit Language' : 'Add Language'} />
      <Row>
        <Col lg="12">
          <LanguageForm  details={details}  editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/language-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddLanguage;
