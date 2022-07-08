import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_icd_categories, update_icd_categories, update_multi_icd_categories, delete_icd_categories } from '../../../context/actions/icdCategories';
import { pagination, sorting } from './../../../utils/constants';

const ICDCategoriesList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState('createdon');
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_icd_categories({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let icdCategories = useSelector(state => state.icdCategory);
  const _handleDelete = (obj) => {
    dispatch(delete_icd_categories({ status: 0, recordId: obj._id, parent_id: obj.parent, name: obj.ame }, result => {
      // if (result.messageID === 200) window.location.reload(true) }));
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (icdCategories.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_icd_categories({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_icd_categories({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1) })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_icd_categories({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_icd_categories({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
         _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_icd_categories({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_icd_categories({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={icdCategories.records}
        count={icdCategories.count}
        type={'ICD Category'}
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

export default ICDCategoriesList;
