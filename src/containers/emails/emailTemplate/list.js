import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_email_template, update_email_template, update_multi_email_template, send_emails } from '../../../context/actions/email';
import { pagination, sorting } from '../../../utils/constants';
import { toast } from "react-toastify";
const EmailTemplateList = ({ history }) => {
    const dispatch = useDispatch();

    let [page, setPage] = useState(pagination.page);
    let [sortKey, setSortKey] = useState(sorting.sortkey);
    let [sortBy, setSortBy] = useState(sorting.sortby);
    let [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(list_email_template({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
    }, []);
    let userdata = useSelector(state => state.user);
    let emailTemplates = useSelector(state => state.emails.emailtemplate);
    // const _handleDelete = (rid) => {
    //     dispatch(update_email_template({ status: 0, recordId: rid }, (() => { _handlePageChange(1); })));
    // }
    const _handleToggle = (state, rid) => {
        dispatch(update_email_template({ status: state ? 1 : 2, recordId: rid }, (() => { _handlePageChange(1); })));
    }
    const _handlePageChange = (activePage) => {
        setPage(activePage);
        dispatch(list_email_template({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
    }
    const _handleSendEmails = (parms) => {
        if (userdata.role === 3)
            dispatch(send_emails(parms, (() => { })))
        else
            toast.warn("You haven't access to send mail");

    }

    const _handleSelected = (key, rid) => {
        let newStatus = 1;
        if (key === 'Active') newStatus = 1;
        if (key === 'Inactive') newStatus = 2;
        if (key === 'Delete') newStatus = 0;
        dispatch(update_multi_email_template({ status: newStatus, recordIds: rid }, result => {
            if (result.messageID === 200) {
                _handlePageChange(1);
            }
        }));
    }
    const _handleSearch = async (key) => {
        await setSearch(key);
        dispatch(list_email_template({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
    }

    const _handleSorting = async (sortkey, sortby) => {
        await setSortBy(sortby); await setSortKey(sortkey);
        dispatch(list_email_template({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
    }

    return (
        <>
            <TableList
                list={emailTemplates.records}
                count={emailTemplates.count}
                type={'Email Template'}
                page={page}
                sortkey={sortKey}
                sortby={sortBy}
                // handleDelete={(id) => _handleDelete(id)}
                handleToggle={(state, id) => _handleToggle(state, id)}
                handlePageChange={(page) => _handlePageChange(page)}
                handleSelectedAction={(key, id) => _handleSelected(key, id)}
                handleSearch={(key) => _handleSearch(key)}
                handleSorting={(key, by) => _handleSorting(key, by)}
                handleEmail={(val) => _handleSendEmails(val)}
                history={history}
            />
        </>
    )
};

export default EmailTemplateList;
