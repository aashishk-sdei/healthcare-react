import React, { useState } from "react";
import { Row, Col } from 'reactstrap';
import Heading4 from '../../../components/common/Heading4/Heading4';
import MediaVideo from './../../managePrograms/program/lesson/lessonBlock/media/mediaType/mediaVideo/mediaVideo';
import MediaContent from './../../managePrograms/program/lesson/lessonBlock/media/mediaType/mediaContent/mediaContent';
import MediaPDF from './../../managePrograms/program/lesson/lessonBlock/media/mediaType/mediaPDF/mediaPDF';
import { Button } from 'reactstrap';

import './knowledgeMedia.scss';
const KnowledgeMedia = ({ selectedTab, handleAvailable, handleMedia, handleSelected, listData, availableMedia, editable = {} }) => {
  return (
    <>
      <div className="mediaSection">
        {selectedTab !== '' && <Heading4 className="top-sec-heading">Click to Add Knowledge Bank Media Section
        <div className="editor-btm text-right top-back-btn">
            <Button theme="accent" className="btn-accent" onClick={() => handleAvailable(true)}>Done</Button>
          </div></Heading4>}
        <div className="mediaSectionInner">
          <div className="mediaTab">
            {selectedTab === '0' && <Row>
              <Col sm="12">
                <MediaVideo _handleMedia={(obj) => handleMedia({ ...obj, type: 'video' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'video' })} availableMedia={availableMedia.length !== 0 ? availableMedia.filter(e => e.type === 'video') : []} media={listData.filter(e => e.type === 'video')} editable={editable} />
              </Col>
            </Row>}
            {selectedTab === '1' && <Row>
              <Col sm="12">
                <MediaPDF _handleMedia={(obj) => handleMedia({ ...obj, type: 'pdf' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'pdf' })} availableMedia={availableMedia.length !== 0 ? availableMedia.filter(e => e.type === 'pdf') : []} pdfs={listData.filter(e => e.type === 'pdf')} editable={editable} />
              </Col>
            </Row>}
            {selectedTab === '2' && <Row>
              <Col sm="12">
                <MediaContent _handleMedia={(obj) => handleMedia({ ...obj, type: 'contentPage' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'contentPage' })} availableMedia={availableMedia.length !== 0 ? availableMedia.filter(e => e.type === 'contentPage') : []} contentPages={listData.filter(e => e.type === 'contentPage')} editable={editable} />
              </Col>
            </Row>}
          </div>
        </div>
      </div>
    </>
  )
};

export default KnowledgeMedia;
