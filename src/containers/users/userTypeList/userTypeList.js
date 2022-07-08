import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { pagination, sorting } from './../../../utils/constants';
import { assigned_reset_views } from './../../../context/actions/assignViews';
import { assigned_reset_permission } from './../../../context/actions/managePermission';
import { list_user_type, update_user_type, update_multi_user_type, delete_user_type } from '../../../context/actions/userType';

const UseTypeList = ({ history }) => {

  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');


  useEffect(() => {
    dispatch(assigned_reset_permission({}));
    dispatch(assigned_reset_views({}));
    dispatch(list_user_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let userType = useSelector(state => state.userType);

  const _handleDelete = (rid) => {
    dispatch(delete_user_type({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (userType.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_user_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_user_type({ status: state ? 1 : 2, recordId: rid }, (result => { })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_user_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_user_type({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        if (key === 'Delete') _handlePageChange(1);
      }
    }));
    // if (key === 'Delete') dispatch(list_user_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  };

  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_user_type({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }


  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_user_type({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={userType.records}
        count={userType.count}
        type={'User Type'}
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

export default UseTypeList;
