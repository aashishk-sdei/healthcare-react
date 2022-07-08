import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_census,update_census,update_multi_census } from '../../../context/actions/census';
import { pagination, sorting } from '../../../utils/constants';

const ManageCensusList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_census({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let census = useSelector(state => state.census);

  const _handleDelete = (rid) => {
    dispatch(update_census({ status: 0, recordId: rid, flag: 'status' }), result => {
      if (result.messageID === 200) {
        dispatch(list_census({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
      }
    });
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_census({ status: state ? 1 : 2, recordId: rid, flag: 'status' }, (() => { _handlePageChange(1); })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_census({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_census({ status: newStatus, recordIds: rid, flag: 'status' }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_census({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_census({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={census.records}
        count={census.count}
        type={'Manage Census'}
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

export default ManageCensusList;
