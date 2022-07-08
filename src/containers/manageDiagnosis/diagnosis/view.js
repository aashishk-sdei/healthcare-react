import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import DiagnosisFrom from "../components/addDiagnosisForm";
import { update_diagnosis, create_diagnosis, icd_code_all } from '../../../context/actions/diagnosis';
const ViewDiagnosis = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    let details = useSelector(state => state.carepath.diagnosis.records && state.general.param2 && state.general.param2 != '' && state.carepath.diagnosis.records.find(item => item['@rid'] === state.general.param2));
    let ICD = useSelector(state => state.diagnosis.icdCode);
    const _submitData = async (data) => {
        const redir = data.point;
        delete data.point;
        if (data['recordId'] && data['recordId'] !== '') {
            dispatch(update_diagnosis(data, result => {
                if (result.messageID === 200) {
                    history.push('/diagnosis-list');
                }
            }));
        } else {
            dispatch(create_diagnosis(data, result => {
                if (result.messageID === 200) history.push(redir ? '/diagnosis-list' : '/add-problem');
            }));
        }
    }

    const _search_ICD = async (keyword) => {
        await dispatch(icd_code_all({ search: keyword }))
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push(history.location.search.split('=')[1])} title={details ? isView ? 'Diagnosis' : 'Edit Diagnosis' : 'Add Diagnosis'} />
            <Row>
                <Col lg="12">
                    <DiagnosisFrom details={details} editable={!isView} submitData={(val) => _submitData(val)} ICDCodes={ICD} search_ICD={val => _search_ICD(val)} cancel={() => history.push('/diagnosis-list')} />
                </Col>
            </Row>
        </>
    )
};
export default ViewDiagnosis;
