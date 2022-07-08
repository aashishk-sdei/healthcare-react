import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import EmailTemplateForm from "./../components/emailTemplateForm";
import { pagination } from '../../../utils/constants';
import { get_language } from '../../../context/actions/questionnaire';
import { create_email_template, update_email_template, list_email_type, list_email_tag } from '../../../context/actions/email';
const AddEmailTemplate = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
        dispatch(get_language({}));
        dispatch(list_email_tag({}));
        dispatch(list_email_type({ limit: pagination.maxlimit }));
    }, []);
    let tags = useSelector(state => state.tag.records && state.tag.records.filter(item => item.status == 1));
    let emailTypes = useSelector(state => state.emails.emailtype.records && state.emails.emailtype.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 40 ? `${item['name'].substring(0, 40)}...` : item['name']; return item; } }));
    let details = useSelector(state => state.emails.emailtemplate.records && isAdd && state.general.param1 && state.general.param1 != '' && state.emails.emailtemplate.records.find(item => item['@rid'] === state.general.param1));
    let languages = useSelector(state => state.general.language) || [];
    const _submitData = async (data) => {
        if (data['recordId'] && data['recordId'] !== '') {
            await dispatch(update_email_template(data, result => {
                if (result.messageID === 200) {
                    history.push('/email-template-list');
                }
            }));
        } else {
            dispatch(create_email_template(data, result => {
                if (result.messageID === 200) history.push('/email-template-list');
            }));
        }
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/email-template-list')} title={details ? isView ? 'Email Template' : 'Edit Email Template' : 'Add Email Template'} />
            <Row>
                <Col lg="12">
                    <EmailTemplateForm title="Manage Email Template" details={details} emailTypes={emailTypes} tags={tags} languages={languages} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/email-template-list')} />
                </Col>
            </Row>
        </>
    )
};

export default AddEmailTemplate;
