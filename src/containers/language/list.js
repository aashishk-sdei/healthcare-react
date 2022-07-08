import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../components/common/TableList/TableList';
import { list_data, update_language, update_multi_language } from '../../context/actions/language';
import { pagination, sorting } from '../../utils/constants';
const LanguageList = ({ history }) => {
    const dispatch = useDispatch();

    let [page, setPage] = useState(pagination.page);
    let [sortKey, setSortKey] = useState(sorting.sortkey);
    let [sortBy, setSortBy] = useState(sorting.sortby);
    let [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
    }, []);

    let language = useSelector(state => state.language);

    const _handleDelete = (rid) => {
        dispatch(update_language({ status: 0, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handleToggle = (state, rid) => {
        dispatch(update_language({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handlePageChange = (activePage) => {
        setPage(activePage);
        dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
    }


    const _handleSelected = (key, rid) => {
        let newStatus = 1;
        if (key === 'Active') newStatus = 1;
        if (key === 'Inactive') newStatus = 2;
        if (key === 'Delete') newStatus = 0;
        dispatch(update_multi_language({ status: newStatus, recordIds: rid }, result => {
            if (result.messageID === 200) {
                _handlePageChange(1);
            }
        }));
    }
    const _handleSearch = async (key) => {
        await setSearch(key);
        dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
    }

    const _handleSorting = async (sortkey, sortby) => {
        await setSortBy(sortby); await setSortKey(sortkey);
        dispatch(list_data({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
    }

    return (
        <>
            <TableList
                list={language.records}
                count={language.count}
                type={'Language'}
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

export default LanguageList;
