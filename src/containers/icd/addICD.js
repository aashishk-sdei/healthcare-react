import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../components/common/PageHeader/PageHeader';
import ICDForm from "./components/ICDForm";
import { list_icd_categories } from '../../context/actions/icdCategories';
import { create_icd, create_icd_csv, update_icd } from '../../context/actions/icd';

import { pagination } from './../../utils/constants';
const AddICD = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("manage"));
  useEffect(() => {
    dispatch(list_icd_categories({ sortBy: 1, sortKey: 'category_name', search: '', limit: pagination.maxlimit, page: pagination.page }));
  }, []);
  let categories = useSelector(state => state.icdCategory.records && state.icdCategory.records.filter(item => item.status == 1  && item));

  let details = useSelector(state => state.icd.records && isAdd && state.general.param1 && state.general.param1 != '' && state.icd.records.find(item => item._id === state.general.param1));
  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_icd(data, result => {
        if (result.messageID === 200) {
          history.push('/icd');
        }
      }));
    } else {
      if (data.file) {
        dispatch(create_icd_csv(data, result => {
          if (result.messageID === 201) history.push('/icd');
        }));
      } else {
        dispatch(create_icd(data, result => {
          if (result.messageID === 200) history.push('/icd');
        }));
      }
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/icd')} title={details ? isView ? 'ICD' : 'Edit ICD' : 'Add ICD Form'} />
      <Row>
        <Col lg="12">
          <ICDForm title="ICD Information" details={details} editable={!isView} categories={categories} submitData={(val) => _submitData(val)} cancel={() => history.push('/icd')} />
        </Col>
      </Row>
    </>
  )
};

export default AddICD;
