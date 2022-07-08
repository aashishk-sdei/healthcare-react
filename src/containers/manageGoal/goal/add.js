import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import GoalFrom from "../components/addGoalForm";
import { create_goal, update_goal } from '../../../context/actions/goal';
import { list_diagnosis } from '../../../context/actions/diagnosis';
import { get_language } from '../../../context/actions/questionnaire';
import { list_problem } from '../../../context/actions/problem';
import { pagination } from '../../../utils/constants';
const AddGoal = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
        dispatch(get_language({}));
        dispatch(list_diagnosis({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit,page:pagination.page}));
        dispatch(list_problem({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit,page:pagination.page}));
    }, []);

    let details = useSelector(state => state.goal.records && isAdd && state.general.param1 && state.general.param1 != '' && state.goal.records.find(item => item['@rid'] === state.general.param1));
    let diagnosis = useSelector(state => state.diagnosis.records && state.diagnosis.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let problemList = useSelector(state => state.problem.records && state.problem.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; }}));
    let languageList = useSelector(state => state.general.language) || [];
    let parm = useSelector(state => state.general.param2);
    let object1 = useSelector(state => state.general.object1);
    let inx =  problemList.findIndex(e=>e['@rid']===parm);
    let dignosisSeleted ='';
    if(inx === -1 && !details && object1 && parm){
        problemList.push(object1);
        dignosisSeleted = object1.diagnosis;
    }
    let goalTypeList = [{ key: "Short Term", value: "Short Term" }, { key: "Long Term", value: "Long Term" }];

    const _submitData = async (data) => {
        const redir = data.point;
        delete data.point;
        if (data['recordId'] && data['recordId'] !== '') {
            await dispatch(update_goal(data, result => {
                if (result.messageID === 200) {
                    history.push('/goal-list');
                }
            }));
        } else {
            dispatch(create_goal(data, result => {
                if (result.messageID === 200) history.push(redir ? '/add-intervention' : '/goal-list');
            }));
        }
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/goal-list')} title={details ? isView ? 'Goal' : 'Edit Goal' : 'Add Goal'} />
            <Row>
                <Col lg="12">
                    <GoalFrom title="Manage Goal" details={details} parm={parm} dignosisSeleted={dignosisSeleted} diagnosis={diagnosis} problemList={problemList} languageList={languageList} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/goal-list')} goalTypeList={goalTypeList} />
                </Col>
            </Row>
        </>
    )
};
export default AddGoal;
