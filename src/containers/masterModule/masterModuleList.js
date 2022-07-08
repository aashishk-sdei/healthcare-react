import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../components/common/TableList/TableList';
import { list_data, update } from '../../context/actions/modules';
import { pagination, sorting } from '../../utils/constants';

const MasterModuleList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let modules = useSelector(state => state.modules);
  const _handleToggle = (state, rid) => {
    dispatch(update({ status: state ? 1 : 0, id: rid }, (result => { })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
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
        list={modules.records}
        count={modules.count}
        type={'Master Module'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
        handleToggle={(state, id) => _handleToggle(state, id)}
        handlePageChange={(page) => _handlePageChange(page)}
        handleSearch={(key) => _handleSearch(key)}
        handleSorting={(key, by) => _handleSorting(key, by)}
        history={history}
      />
    </>
  )
};

export default MasterModuleList;
