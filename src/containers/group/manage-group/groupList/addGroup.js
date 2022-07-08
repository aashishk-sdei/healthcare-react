import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../../components/common/PageHeader/PageHeader';
import GroupForm from "../../../../components/group/groupForm";
import GroupDetails from "../../../../components/group/groupDetails";
import { create_group, update_group } from '../../../../context/actions/group';
import { list_group_type } from '../../../../context/actions/groupType';
import { pagination, sorting } from './../../../../utils/constants';

const AddGroup = ({ match, history }) => {

  const dispatch = useDispatch();

  let [flag, setFlag] = useState(false);
  let [groupPayload, setGroupPayload] = useState(false);
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("manage"));
  useEffect(() => {
    dispatch(list_group_type({ sortBy: 1, sortKey: 'name', search: '', limit: pagination.maxlimit, page: pagination.page }));
  }, []);

  let details = useSelector(state => state.group.records && isAdd && state.general.param1 && state.general.param1 !== '' && state.group.records.find(item => item['@rid'] === state.general.param1));
  let groupType = useSelector(state => state.groupType.records && state.groupType.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));
  const _primaryContact = (data) => {
    setGroupPayload({ ...data });
    if (data) setFlag(!flag);
  }
  const _submitData = async (data) => {
    const payload = { ...groupPayload, ...data };
    setGroupPayload(payload)
    if (payload['recordId'] && payload['recordId'] !== '') {
      await dispatch(update_group(payload, result => {
        if (result.messageID === 200) {
          history.push('/group-list');
        }
      }));
    } else {
      dispatch(create_group(payload, result => {
        if (result.messageID === 201) history.push('/group-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/group-list')} title={details ? isView ? 'Group' : 'Edit Group' : 'Add Group Form'} />
      <Row>
        <Col lg="8">
          <GroupForm title="Group Information" details={details} groupType={groupType} flag={isView ? flag : !flag} editable={!isView} isNext={(val) => _primaryContact(val)} cancel={() => history.push('/group-list')} makeEditale={() => setFlag(!flag)} />
        </Col>
        <Col lg="4">
          <GroupDetails title="Primary Contact" details={details} flag={flag} submitData={(data) => _submitData(data)} cancel={() => history.push('/group-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddGroup;
