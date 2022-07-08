import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_knowledge, update_knowledge, update_multi_knowledge, delete_knowledge } from '../../../context/actions/knowledge';
import { pagination, sorting } from '../../../utils/constants';

const KnowledgeList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(list_knowledge({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let knowledgeList = useSelector(state => state.knowledge);
  knowledgeList.records = knowledgeList.records.map(item => {
    let newcategory = '';
    item.category.map((element, index) => {
      if (index === item.category.length - 1) newcategory = newcategory + element.name;
      else newcategory = newcategory + `${element.name}, `;
    });
    item['categories'] = newcategory;
    return item;
  });

  const _handleDelete = (rid) => {
    dispatch(delete_knowledge({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (knowledgeList.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_knowledge({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    dispatch(update_knowledge({ status: state ? 1 : 2, recordId: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_knowledge({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_knowledge({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        if (key === 'Delete' || key === 'Inactive') _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_knowledge({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_knowledge({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={knowledgeList.records}
        count={knowledgeList.count}
        type={'Knowledge Bank'}
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

export default KnowledgeList;
