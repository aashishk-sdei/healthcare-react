import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import InterventionFrom from "../components/addInterventionForm";
import { create_intervention, list_intervention_category, update_intervention } from '../../../context/actions/intervention';
import { list_diagnosis } from '../../../context/actions/diagnosis';
import { get_language } from '../../../context/actions/questionnaire';
import { list_problem } from '../../../context/actions/problem';
import { list_goal } from '../../../context/actions/goal';
import { list_program } from '../../../context/actions/program';
import { list_knowledge } from '../../../context/actions/knowledge';
import { pagination } from '../../../utils/constants';
// import { setparams, setparams2 } from './../../../context/actions/general';
const AddIntervention = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
        dispatch(get_language({}));
        dispatch(list_diagnosis({ sortBy: 1, sortKey: 'name',limit: pagination.maxlimit, page: pagination.page }));
        dispatch(list_problem({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: pagination.page }));
        dispatch(list_goal({ sortBy: 1, sortKey: 'name',limit: pagination.maxlimit, page: pagination.page }));
        dispatch(list_program({ limit: pagination.maxlimit, page: pagination.page }));
        dispatch(list_knowledge({ limit: pagination.maxlimit, page: pagination.page }));
        dispatch(list_intervention_category({ limit: pagination.maxlimit, page: pagination.page }));
    }, []);

    let details = useSelector(state => state.intervention.records && isAdd && state.general.param1 && state.general.param1 != '' && state.intervention.records.find(item => item['@rid'] === state.general.param1));
    let diagnosis = useSelector(state => state.diagnosis.records && state.diagnosis.records.filter(item => { if (item.status == 1){ item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let problemList = useSelector(state => state.problem.records && state.problem.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let goalList = useSelector(state => state.goal.records && state.goal.records.filter(item => { if (item.status == 1){ item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let programList = useSelector(state => state.program.records && state.program.records.filter(item => { if (item.status == 1){ item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let knowledgeList = useSelector(state => state.knowledge.records && state.knowledge.records.filter(item => { if (item.status == 1){ item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let parm = useSelector(state => state.general.param2);
    let object1 = useSelector(state => state.general.object1);
    let inx =  goalList.findIndex(e=>e['@rid']===parm);
    let dignosisSeleted ='';
    let defaultProblem ='';
    if(inx === -1 && !details && object1 && parm){
        goalList.push(object1)
        dignosisSeleted = object1.diagnosis;
        defaultProblem = object1.problem;
    }
    let languageList = useSelector(state => state.general.language) || [];
    let categoryList = [];
    categoryList =useSelector(state => state.intervention.interventionCategory)||[]; 
    const _submitData = async (data) => {
        const redir = data.point;
        delete data.point;
        if (data['recordId'] && data['recordId'] !== '') {
            await dispatch(update_intervention(data, result => {
                if (result.messageID === 200) {
                    history.push('/intervention-list');
                }
            }));
        } else {
            dispatch(create_intervention(data, result => {
                if (result.messageID === 200 && redir) history.push('/intervention-list');
            }));
        }
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/intervention-list')} title={details ? isView ? 'Intervention' : 'Edit Intervention' : 'Add Intervention'} />
            <Row>
                <Col lg="12">
                    <InterventionFrom title="Manage Intervention" dignosisSeleted={dignosisSeleted} defaultProblem={defaultProblem} parm={parm} details={details} diagnosis={diagnosis} problemList={problemList} goalList={goalList} programList={programList} knowledgeList={knowledgeList} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/intervention-list')} categoryList={categoryList} languageList={languageList} />
                </Col>
            </Row>
        </>
    )
};
export default AddIntervention;
