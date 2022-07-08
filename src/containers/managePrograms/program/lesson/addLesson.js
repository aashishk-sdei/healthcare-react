import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../../components/common/PageHeader/PageHeader';
import { create_lession, update_lession, get_language, list_media, create_media, list_lession } from '../../../../context/actions/program';
import { list_questionnaire } from '../../../../context/actions/questionnaire';
import { pagination, sorting } from '../../../../utils/constants';
import LessonBlock from './lessonBlock/lessonBlock';

const AddLesson = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_questionnaire({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_media({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
    dispatch(list_lession({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit }));
  }, []);

  const isView = match.path.includes("view");
  let Questionnaire = useSelector(state => state.questionnaire.records && state.questionnaire.records.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));
  let Language = useSelector(state => state.general.language) || [];
  let Media = useSelector(state => state.program.media.records);
  let details = useSelector(state => state.program.lession.records.find(item => item['@rid'] === state.general.param2)); //item['@rid' === `#${match.params.id}`]
  const programId = useSelector(state => state.general.param1);
  let availableSections = [];
  if (details) {
    availableSections = [...JSON.parse(details.rewards ? details.rewards : []), ...JSON.parse(details.contentPages ? details.contentPages : []), ...JSON.parse(details.videos ? details.videos : []), ...JSON.parse(details.questionnaires ? details.questionnaires : [])];
    availableSections = availableSections.sort((a, b) => { return a['rank'] - b['rank'] });
  }

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_lession(data, result => {
        if (result.messageID === 200) { history.push(`/edit-program`); }
      }));
    } else {
      dispatch(create_lession(data, result => { if (result.messageID === 201) history.push(`/edit-program`); }));
    }
  }

  const _submitMedia = async (data) => {
    dispatch(create_media(data, result => { if (result.messageID === 201) dispatch(list_media({ sortBy: sorting.sortby, sortKey: sorting.sortkey, limit: pagination.maxlimit })); }));
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/add-program')} title={details ? isView ? 'View Lesson' : 'Edit Lesson' : 'Add Lesson'} />
      <Row>
        <Col sm="12">
          <div className="mb-4 card card-small p-3">
            <LessonBlock details={details} Language={Language}
             mediaData={{ questionnaire: Questionnaire, media: Media }}
              AvailableSections={availableSections} editable={!isView}
               submitData={(val) => _submitData(val)}
                submitMedia={(val) => _submitMedia(val)} 
                cancel={() => history.push(programId ? `/edit-program` : `/program-list`)} />
          </div>
        </Col>
      </Row>
    </>
  )
};

export default AddLesson;
