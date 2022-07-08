import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_problem, update_problem, update_multi_problem,update_problem_status } from '../../../context/actions/problem';
import { list_diagnosis } from '../../../context/actions/diagnosis';
import { pagination, sorting } from '../../../utils/constants';
const ProblemList = ({ history }) => {
    const dispatch = useDispatch();

    let [page, setPage] = useState(pagination.page);
    let [sortKey, setSortKey] = useState(sorting.sortkey);
    let [sortBy, setSortBy] = useState(sorting.sortby);
    let [search, setSearch] = useState('');
    let filterParam = useSelector(state => state.general.filterParam);
    let queryParms ={ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page,filter: filterParam};

    useEffect(() => {
        dispatch(list_diagnosis({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit, page: page }));
        dispatch(list_problem( queryParms));
    }, []);

    let problems = useSelector(state => state.problem);
    let diagnosis = useSelector(state => state.diagnosis.records);
    const _handleDelete = (rid) => {
        dispatch(update_problem_status({ status: 0, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handleToggle = (state, rid) => {
        dispatch(update_problem_status({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handlePageChange = (activePage) => {
        setPage(activePage);
        dispatch(list_problem({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
    }


    const _handleSelected = (key, rid) => {
        let newStatus = 1;
        if (key === 'Active') newStatus = 1;
        if (key === 'Inactive') newStatus = 2;
        if (key === 'Delete') newStatus = 0;
        dispatch(update_multi_problem({ status: newStatus, recordIds: rid }, result => {
            if (result.messageID === 200) {
                _handlePageChange(1);
            }
        }));
    }
    const _handleSearch = async (key) => {
        await setSearch(key);
        dispatch(list_problem({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
    }
    const _diagnosisFilter = async (key) => {
        dispatch(list_problem({ sortBy: sortBy, sortKey: sortKey, filter: key, limit: pagination.limit, page: 1 }));
    }
    const _clearFilter = async () => {
        dispatch(list_problem({ sortBy: sortBy, sortKey: sortKey,limit: pagination.limit, page: 1 }));
    }
    const _handleSorting = async (sortkey, sortby) => {
        await setSortBy(sortby); await setSortKey(sortkey);
        dispatch(list_problem({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
    }

    return (
        <>
            <TableList
                list={problems.records}
                count={problems.count}
                type={'Problem'}
                diagnosis={diagnosis}
                page={page}
                sortkey={sortKey}
                filterDia={true}
                sortby={sortBy}
                diagnosisFilter={(id)=>_diagnosisFilter(id)}
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

export default ProblemList;
