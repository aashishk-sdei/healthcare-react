import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import TableList2 from '../../../../components/common/TableList/TableList2';
import { list_lession, update_lession, update_multi_lession,
   delete_lession } from '../../../../context/actions/program';
import { pagination, sorting } from '../../../../utils/constants';

const LessonList = ({ history, programId, LessionList, view }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');

  const _handleToggle = (state, rid) => {
    dispatch(update_lession({ status: state ? 1 : 2, recordId: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }

  const _handleDelete = (rid) => {
    dispatch(delete_lession({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }

  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_lession({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_lession({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_lession({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_lession({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }
  const pleaseClick = async  (id) =>{
   alert("helllo")
  }
  return (
    <>
      <TableList2
        lessonListing={true}
        list={LessionList || []}
        count={LessionList.length}
        type={'Lesson'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
        programId={programId}
        view={view}
        click = {(id)=>pleaseClick(id)}
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

export default LessonList;
