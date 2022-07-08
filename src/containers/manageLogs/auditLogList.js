import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AuditLogListTable from '../../components/common/TableList/AuditLogTableList';
import { list_data, export_audit_logs } from '../../context/actions/auditLog';
import { pagination, sorting } from '../../utils/constants';

const AuditLogList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_data({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let auditLog = useSelector(state => state.auditLog);
  
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

  const _handleCSVDownload = async (dateRanges) => {
    dispatch(export_audit_logs(dateRanges));
  }

  let logData = useSelector(state => state.auditLog);
  // console.log(logData, "logData");
  return (
    <AuditLogListTable
      list={auditLog.records}
      exportData={logData.exportData}
      headers={logData.headers}
      count={auditLog.count}
      type={'Manage Audit Logs'}
      page={page}
      sortkey={sortKey}
      sortby={sortBy}
      handlePageChange={(page) => _handlePageChange(page)}
      handleSearch={(key) => _handleSearch(key)}
      handleSorting={(key, by) => _handleSorting(key, by)}
      handleCSVDownload={(dateRanges) => _handleCSVDownload(dateRanges)}
      history={history}
    />
  )
};

export default AuditLogList;
