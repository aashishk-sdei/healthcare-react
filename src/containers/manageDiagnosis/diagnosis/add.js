import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import DiagnosisFrom from "../components/addDiagnosisForm";
import { update_diagnosis, create_diagnosis, icd_code_all,list_diagnosis, clear_search } from '../../../context/actions/diagnosis';
import { pagination, sorting } from '../../../utils/constants';
import { list_data } from '../../../context/actions/language';
const AddDiagnosis = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
        dispatch(list_data({ limit: pagination.maxlimit, page: 1 }));
        dispatch(clear_search({}));
    }, []);

    let details = useSelector(state => state.diagnosis.records && isAdd && state.general.param1 && state.general.param1 != '' && state.diagnosis.records.find(item => item['@rid'] === state.general.param1));
    let ICD = useSelector(state => state.diagnosis.icdCode);
    let languages = useSelector(state => state.language.records);
    const _submitData = async (data) => {
        const redir = data.point;
        debugger;
        delete data.point;
        if (data['recordId'] && data['recordId'] !== '') {
            dispatch(update_diagnosis(data, result => {
                if (result.messageID === 200) {
                    history.push('/diagnosis-list');
                }
            }));
        } else {
            dispatch(create_diagnosis(data, async(result) => {
                if (result.messageID === 200) history.push(redir ? '/diagnosis-list' : '/add-problem');
            }));
        }
    }

    const _search_ICD = async (keyword) => {
        await dispatch(icd_code_all({ search: keyword }))
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/diagnosis-list')} title={details ? isView ? 'Diagnosis' : 'Edit Diagnosis' : 'Add Diagnosis'} />
            <Row>
                <Col lg="12">
                    <DiagnosisFrom details={details} editable={!isView} languages={languages} submitData={(val) => _submitData(val)} ICDCodes={ICD} search_ICD={val => _search_ICD(val)} cancel={() => history.push('/diagnosis-list')} />
                </Col>
            </Row>
        </>
    )
};
export default AddDiagnosis;
