import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_care_path,  update_care_path, update_multi_care_path} from '../../../context/actions/carePathway';
import { pagination, sorting } from '../../../utils/constants';
const CarePathwayList = ({history}) => {
    const dispatch = useDispatch();

    let [page, setPage] = useState(pagination.page);
    let [sortKey, setSortKey] = useState(sorting.sortkey);
    let [sortBy, setSortBy] = useState(sorting.sortby);
    let [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(list_care_path({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
    }, []);

    let carepath = useSelector(state => state.carepath);

    const _handleDelete = (rid) => {
        dispatch(update_care_path({ status: 0, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handleToggle = (state, rid) => {
        dispatch(update_care_path({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handlePageChange = (activePage) => {
        setPage(activePage);
        dispatch(list_care_path({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
    }


    const _handleSelected = (key, rid) => {
        let newStatus = 1;
        if (key === 'Active') newStatus = 1;
        if (key === 'Inactive') newStatus = 2;
        if (key === 'Delete') newStatus = 0;
        dispatch(update_multi_care_path({ status: newStatus, recordIds: rid }, result => {
            if (result.messageID === 200) {
                _handlePageChange(1);
            }
        }));
    }
    const _handleSearch = async (key) => {
        await setSearch(key);
        dispatch(list_care_path({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
    }

    const _handleSorting = async (sortkey, sortby) => {
        await setSortBy(sortby); await setSortKey(sortkey);
        dispatch(list_care_path({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
    }

    return (
        <>
            <TableList
                list={carepath.records}
                count={carepath.count}
                type={'Care Pathway'}
                page={page}
                sortkey={sortKey}
                sortby={sortBy}
                handleDelete={(id) => _handleDelete(id)}
                handleToggle={(state, id) => _handleToggle(state, id)}
                handlePageChange={(page) => _handlePageChange(page)}
                handleSelectedAction={(key, id) => _handleSelected(key, id)}
                handleSearch={(key) => _handleSearch(key)}
                handleSorting={(key, by) => _handleSorting(key, by)}
                history={history}
            />
        </>
    )
};

export default CarePathwayList;
