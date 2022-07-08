import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../components/common/TableList/TableList';
import { list_staff, delete_staff, update_staff, update_multi_staff } from '../../context/actions/staff';
import { pagination, sorting } from './../../utils/constants';

const StaffList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState('createdOn');
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_staff({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let staff = useSelector(state => state.staff);
  const _handleDelete = (rid) => {
    dispatch(delete_staff({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (staff.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_staff({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_staff({ status: state ? 1 : 2, recordId: rid }, (result => {
      if (result.messageID === 200)
        dispatch(list_staff({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
    })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_staff({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_staff({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
         _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_staff({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_staff({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={staff.records}
        count={staff.count}
        type={'Staff'}
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

export default StaffList;
