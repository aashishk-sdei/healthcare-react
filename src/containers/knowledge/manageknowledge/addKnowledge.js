import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import KnowledgeForm from "../components/knowledgeForm";
import { create_knowledge, list_knowledge_category, update_knowledge, get_language } from '../../../context/actions/knowledge';
import { list_media, create_media } from '../../../context/actions/program';
import { pagination, sorting } from '../../../utils/constants';

const AddKnowledge = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_media({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_knowledge_category({ sortBy: 1, sortKey: 'name', limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let details = useSelector(state => state.knowledge.records && isAdd && state.general.param1 && state.general.param1 != '' && state.knowledge.records.find(item => item['@rid'] === state.general.param1));
  if (details) {
    let availableSections = [...((details.contentPages && details.contentPages.length) ? details.contentPages : []), ...((details.videos && details.videos.length) ? details.videos : []), ...((details.pdfs && details.pdfs.length) ? details.pdfs : [])];
    availableSections = availableSections.sort((a, b) => { return a['rank'] - b['rank'] });
    details['AvailableSections'] = availableSections;
  }
  let Media = useSelector(state => state.program.media.records);
  let categories = useSelector(state => state.knowledge.knowledgecategory.records && state.knowledge.knowledgecategory.records.filter(item => { if ((details && item.id === details.parent_id) || (item['@rid'] !== state.general.param1 && item.status == 1)) { item['name'] = item['name'].length > 95 ? `${item['name'].substring(0, 95)}...` : item['name']; return item; } }));
  let Language = useSelector(state => state.general.language) || [];
  const handleSubmitMedia = async (data) => {
    dispatch(create_media(data, result => { if (result.messageID === 201) dispatch(list_media({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit })); }));
  }

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_knowledge(data, result => {
        if (result.messageID === 200) {
          history.push('/knowledge');
        }
      }));
    } else {
      dispatch(create_knowledge(data, result => {
        if (result.messageID === 201) history.push('/knowledge');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/knowledge')} title={details ? isView ? 'Knowledge Bank' : 'Edit Knowledge Bank' : 'Add Knowledge Bank'} />
      <Row>
        <Col lg="12">
          <KnowledgeForm titleName="Knowledge Bank Information" details={details} Categories={categories} Language={Language} mediaData={Media} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/knowledge')} submitMedia={(val) => handleSubmitMedia(val)} />
        </Col>
      </Row>
    </>
  )
};

export default AddKnowledge;
