import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_diagnosis, update_diagnosis, update_multi_diagnosis } from '../../../context/actions/diagnosis';
import { pagination, sorting } from '../../../utils/constants';
const DiagnosisList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_diagnosis({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let diagnosis = useSelector(state => state.diagnosis);

  const _handleDelete = (rid) => {
    dispatch(update_diagnosis({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (diagnosis.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_diagnosis({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_diagnosis({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_diagnosis({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }


  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_diagnosis({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_diagnosis({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_diagnosis({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={diagnosis.records}
        count={diagnosis.count}
        type={'Diagnosis'}
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

export default DiagnosisList;
