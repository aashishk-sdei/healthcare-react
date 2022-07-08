import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import UploadCensusForm from "../components/uploadCensusFile";
import { create_census } from '../../../context/actions/census';
const AddCensusFrom = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
  }, []);

  let details = useSelector(state => state.disease.records && isAdd && state.general.param1 && state.general.param1 != '' && state.disease.records.find(item => item['@rid'] === state.general.param1));

  const _submitData = async (data) => {
    dispatch(create_census(data, async (result) => {
      if (result.messageID === 404) history.push( '/census-list');
    }));
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/census-list')} title={'Upload CSV Template' } />
      <Row>
        <Col lg="12">
          <UploadCensusForm title="Manage Census" details={details} submitData={(val) => _submitData(val)} cancel={() => history.push('/census-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddCensusFrom;
