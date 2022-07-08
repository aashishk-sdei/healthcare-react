import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_content_page, update_content_page, update_multi_content_page } from '../../../context/actions/contentPage';
import { pagination, sorting } from '../../../utils/constants';

const ContentPageList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState(sorting.sortkey);
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');
  let contentPageNote = 'New Pages added in this section will be visible on the frontend web application. Pages developed as ‘Parent’ will appear in Menu, while the dependent pages will appear as sub-menu items.';

  useEffect(() => {
    dispatch(list_content_page({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
  }, []);

  let contentPageList = useSelector(state => state.contentPage);

  const _handleDelete = (rid) => {
    dispatch(update_content_page({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }

  const _handleToggle = (state, rid) => {
    dispatch(update_content_page({ status: state ? 1 : 2, recordId: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_content_page({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let newStatus = 1;
    if (key === 'Active') newStatus = 1;
    if (key === 'Inactive') newStatus = 2;
    if (key === 'Delete') newStatus = 0;
    dispatch(update_multi_content_page({ status: newStatus, recordIds: rid }, result => {
      if (result.messageID === 200) {
        _handlePageChange(1);
      }
    }));
  }
  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_content_page({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_content_page({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }

  return (
    <>
      <TableList
        list={contentPageList.records}
        count={contentPageList.count}
        type={'Content Page'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
        contentPageNote={contentPageNote}
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

export default ContentPageList;
