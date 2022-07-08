import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ProblemFrom from "../components/addProblemForm";
import { list_diagnosis } from '../../../context/actions/diagnosis';
import { get_language } from '../../../context/actions/questionnaire';
import { update_problem, create_problem } from '../../../context/actions/problem';
import { pagination, sorting } from '../../../utils/constants';
const AddProblem = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));
   
    useEffect( () => {
        dispatch(get_language({}));
         dispatch(list_diagnosis({ limit: pagination.maxlimit, page: pagination.page }));
        
    }, []);
    let details = useSelector(state => state.problem.records && isAdd && state.general.param1 && state.general.param1 != '' && state.problem.records.find(item => item['@rid'] === state.general.param1));
    let diagnosis = useSelector(state => state.diagnosis.records  && state.diagnosis.records.filter(item => { if (item.status == 1){ item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let parm = useSelector(state => state.general.param2);
    let object1 = useSelector(state => state.general.object1);
    let inx =  diagnosis.findIndex(e=>e['@rid']===parm);
    let languageList = useSelector(state => state.general.language) || [];
    
    if(inx === -1 && !details && object1 && parm)
        diagnosis.push(object1)
    const _submitData = async (data) => {
        const redir = data.point;
        delete data.point;
        if (data['recordId'] && data['recordId'] !== '') {
            await dispatch(update_problem(data, result => {
                if (result.messageID === 200) {
                    history.push('/problem-list');
                }
            }));
        } else {
            dispatch(create_problem(data, result => {
                if (result.messageID === 200) history.push(redir?'/problem-list':'/add-goal');
            }));
        }
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/problem-list')} title={details ? isView ? 'Problem' : 'Edit Problem' : 'Add Problem'} />
            <Row>
                <Col lg="12">
                    <ProblemFrom title="Manage Problem" parm={parm} details={details} languageList={languageList} diagnosis={diagnosis} editable={!isView} submitData={(val) => _submitData(val)}  cancel={() => history.push('/problem-list')} />
                </Col>
            </Row>
        </>
    )
};
export default AddProblem;
