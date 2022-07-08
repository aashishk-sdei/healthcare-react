import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import DiagnosisView from "../components/detailDiagnosis";
import { diagnosis_detail } from '../../../context/actions/diagnosis';

const DetailDiagnosis = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    let details = useSelector(state => state.diagnosis.records && state.general.param1 && state.general.param1 != '' && state.diagnosis.records.find(item => item['@rid'] === state.general.param1));
    useEffect(() => {
        dispatch(diagnosis_detail({recordId: details && details['@rid']}));
    }, []);
    let diagnosisDetails = useSelector(state => state.diagnosis.detail);
    return (
        <>
            <PageHeader className="arrowIconBtn"  title={ 'View Diagnosis'} />
            <Row>
                <Col lg="12">
                    <DiagnosisView details={details} diagnosisDetails={diagnosisDetails} cancel={() => history.push('/diagnosis-list')}/>
                </Col>
            </Row>
        </>
    )
};
export default DetailDiagnosis;
