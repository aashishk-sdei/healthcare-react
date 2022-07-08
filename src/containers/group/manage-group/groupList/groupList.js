import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../../components/common/TableList/TableList';
import { list_group, details_group, update_group, update_multi_group, delete_group } from '../../../../context/actions/group';
import { create_group_module, delete_group_module } from '../../../../context/actions/groupModule';
import { list_data } from '../../../../context/actions/modules';
import { pagination, sorting } from './../../../../utils/constants';

const GroupList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_group({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let group = useSelector(state => state.group);
  let groupDetails = useSelector(state => state.group.details);
  let modules = useSelector(state => state.modules.records.length && state.modules.records.filter(item => item.status == 1)) || [];
  const _handleDetails = (rid) => {
    dispatch(details_group({ recordID: rid }));
    dispatch(list_data({ limit: pagination.maxlimit, page: page }));
  }
  const _handleModuleLink = (query) => {
    if (query.type === 'add') {
      delete query.type;
      dispatch(create_group_module(query));
    }
    if (query.type === 'delete') {
      delete query.type;
      query['status'] = 0;
      dispatch(delete_group_module(query));
    }
  }
  const _handleDelete = (rid) => {
    dispatch(delete_group({ status: 0, recordId: rid }), result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (group.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    });
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_group({ status: state ? 1 : 2, recordId: rid }, (result => { })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_group({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_group({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        if (key === 'Delete') _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_group({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }
  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_group({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={group.records}
        count={group.count}
        details={groupDetails}
        modules={modules}
        type={'Group'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
        handleDetails={(id) => _handleDetails(id)}
        handleModuleLink={(query) => _handleModuleLink(query)}
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

export default GroupList;
