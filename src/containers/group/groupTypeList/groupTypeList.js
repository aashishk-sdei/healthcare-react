import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { pagination, sorting } from './../../../utils/constants';
import { list_group_type, update_group_type, update_multi_group_type, delete_group_type } from '../../../context/actions/groupType';

const GroupTypeList = ({ history }) => {
  const dispatch = useDispatch();
  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');


  useEffect(() => {
    dispatch(list_group_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let groupType = useSelector(state => state.groupType);

  const _handleDelete = (rid) => {
    dispatch(delete_group_type({ status: 0, recordId: rid }), result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (groupType.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_group_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    });
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_group_type({ status: state ? 1 : 2, recordId: rid }, (result => { })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_group_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = async (key, rid,) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    await dispatch(update_multi_group_type({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        if (key === 'Delete') _handlePageChange(1);
      }
    }));
  };

  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_group_type({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }
  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_group_type({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={groupType.records}
        count={groupType.count}
        type={'Group Type'}
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

export default GroupTypeList;
