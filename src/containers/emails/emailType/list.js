import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_email_type, update_email_type, update_multi_email_type } from '../../../context/actions/email';
import { pagination, sorting } from '../../../utils/constants';

const EmailTypeList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_email_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let listData = useSelector(state => state.emails.emailtype);


  const _handleToggle = (state, rid) => {
    dispatch(update_email_type({ status: state ? 1 : 2, recordId: rid, flag: 'status' }, (() => { _handlePageChange(1); })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_email_type({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_email_type({ status: newStatus, recordIds: rid, flag: 'status' }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_email_type({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_email_type({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={listData.records}
        count={listData.count}
        type={'Email Type'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
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

export default EmailTypeList;
