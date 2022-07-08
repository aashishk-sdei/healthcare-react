import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_knowledge_category, update_knowledge_category, update_multi_knowledge_category, delete_knowledge_category } from '../../../context/actions/knowledge';
import { pagination, sorting } from '../../../utils/constants';

const KnowledgeCategoryList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_knowledge_category({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let listData = useSelector(state => state.knowledge.knowledgecategory);

  const _handleDelete = (rid) => {
    dispatch(delete_knowledge_category({ status: 0, recordId: rid, flag: 'status' }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (listData.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_knowledge_category({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_knowledge_category({ status: state ? 1 : 2, recordId: rid, flag: 'status' }, (() => { _handlePageChange(1); })));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_knowledge_category({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_knowledge_category({ status: newStatus, recordIds: rid, flag: 'status' }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_knowledge_category({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_knowledge_category({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={listData.records}
        count={listData.count}
        type={'Knowledge Category'}
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

export default KnowledgeCategoryList;
