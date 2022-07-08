import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_intervention, update_intervention_status, update_multi_intervention } from '../../../context/actions/intervention';
import { list_diagnosis } from '../../../context/actions/diagnosis';
import { list_problem } from '../../../context/actions/problem';
import { list_goal } from '../../../context/actions/goal';
import { pagination, sorting } from '../../../utils/constants';
const InterventionList = ({ history }) => {
    const dispatch = useDispatch();

    let [page, setPage] = useState(pagination.page);
    let [sortKey, setSortKey] = useState(sorting.sortkey);
    let [sortBy, setSortBy] = useState(sorting.sortby);
    let [search, setSearch] = useState('');
    let [problemList, setProblemList] = useState([]);
    let [goalList, setGoalList] = useState([]);
    let filterParam = useSelector(state => state.general.filterParam);
    let queryParms ={ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page,filter:filterParam};
    useEffect(() => {
        dispatch(list_diagnosis({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: page }));
        dispatch(list_problem({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: page }));
        dispatch(list_goal({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: page }));
        dispatch(list_intervention(queryParms));
    }, []);

    let intervention = useSelector(state => state.intervention);
    let diagnosis = useSelector(state => state.diagnosis.records);
    let problem = useSelector(state => state.problem.records);
    let goal = useSelector(state => state.goal.records);

    const _handleDelete = (rid) => {
        dispatch(update_intervention_status({ status: 0, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handleToggle = (state, rid) => {
        dispatch(update_intervention_status({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handlePageChange = (activePage) => {
        setPage(activePage);
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
    }

    const _handleSelected = (key, rid) => {
        let newStatus = 1;
        if (key === 'Active') newStatus = 1;
        if (key === 'Inactive') newStatus = 2;
        if (key === 'Delete') newStatus = 0;
        dispatch(update_multi_intervention({ status: newStatus, recordIds: rid }, result => {
            if (result.messageID === 200) {
                _handlePageChange(1);
            }
        }));
    }
    const _handleSearch = async (key) => {
        await setSearch(key);
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
    }

    const _diagnosisFilter = async (key) => {
        let filterProblemList = problem.filter(e => e.diagnosis === key || e.id === 0);
        setProblemList(filterProblemList)
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey, filter: key, limit: pagination.limit, page: 1 }));
    }

    const _problemFilter = async (key) => {
        let filterGoalList = goal.filter(e => e.problem === key || e.id === 0);
        setGoalList(filterGoalList)
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey, filter: key, limit: pagination.limit, page: 1 }));
    }

    const _clearFilter = async () => {
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey,limit: pagination.limit, page: 1 }));
    }
    const _goalFilter = async (key) => {
        dispatch(list_intervention({ sortBy: sortBy, sortKey: sortKey, filter: key, limit: pagination.limit, page: 1 }));
    }

    const _handleSorting = async (sortkey, sortby) => {
        await setSortBy(sortby); await setSortKey(sortkey);
        dispatch(list_intervention({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
    }

    return (
        <>
            <TableList
                list={intervention.records}
                count={intervention.count}
                type={'Intervention'}
                diagnosis={diagnosis}
                problem={problemList}
                goal={goalList}
                page={page}
                sortkey={sortKey}
                filterDia={true}
                filterProb={true}
                filterGoal={true}
                sortby={sortBy}
                diagnosisFilter={(id) => _diagnosisFilter(id)}
                problemFilter={(id) => _problemFilter(id)}
                goalFilter={(id) => _goalFilter(id)}
                handleDelete={(id) => _handleDelete(id)}
                handleToggle={(state, id) => _handleToggle(state, id)}
                handlePageChange={(page) => _handlePageChange(page)}
                handleSelectedAction={(key, id) => _handleSelected(key, id)}
                handleSearch={(key) => _handleSearch(key)}
                handleSorting={(key, by) => _handleSorting(key, by)}
                history={history}
                clearFilter={()=>_clearFilter()}
                advanceSearch={true}
            />
        </>
    )
};

export default InterventionList;
