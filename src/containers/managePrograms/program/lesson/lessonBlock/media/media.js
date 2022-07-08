import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Heading4 from '../../../../../../components/common/Heading4/Heading4';
import MediaVideo from './mediaType/mediaVideo/mediaVideo';
import MediaContent from './mediaType/mediaContent/mediaContent';
import MediaQuestionnaire from './mediaType/mediaQuestionnaire/mediaQuestionnaire';
import MediaReward from './mediaType/mediaReward/mediaReward';
import MediaPdf from './mediaType/mediaPDF/mediaPDF'
import { Button } from 'reactstrap';

import './media.scss';
const Media = ({ tabIndex, handleAvailable, handleMedia, handleSelected, handleTab, listData, availableMedia, editable = {} }) => {
  const [activeTab, setActiveTab] = useState(tabIndex);
  const toggle = tab => { if (activeTab !== tab) { handleTab(tab); setActiveTab(tab); } }

  return (
    <>
      <div className="mediaSection">
        <Heading4 className="top-sec-heading">Click to Add Lession Section <div className="editor-btm text-right top-back-btn">
          {activeTab !== '' && <Button theme="accent" className="btn-accent" onClick={() => { handleAvailable(true); toggle('') }}>Done</Button>}
        </div></Heading4>
        <div className="mediaSectionInner">
          <div className="mediaTab">
            <Nav tabs className="border-0 overflow-auto">
              <NavItem>
                <NavLink className={`d-inline-flex flex-column justify-content-center align-items-center ${classnames({ active: activeTab === '1' })}`} onClick={() => { handleAvailable(false); toggle('1'); }}>
                  <span className="d-block">
                    <i className="material-icons">play_circle_filled</i>
                  </span>
                  <span className="d-block mediaTabLabl">
                    Video
                      </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`d-inline-flex flex-column justify-content-center
                   align-items-center ${classnames({ active: activeTab === '2' })}`} onClick={() => { handleAvailable(false); toggle('2'); }}>
                  <span className="d-block">
                    <i className="material-icons">description</i>
                  </span>
                  <span className="d-block mediaTabLabl">
                    Content
                    </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`d-inline-flex flex-column justify-content-center align-items-center ${classnames({ active: activeTab === '3' })}`} onClick={() => { handleAvailable(false); toggle('3'); }}>
                  <span className="d-block">
                    <i className="material-icons">help</i>
                  </span>
                  <span className="d-block mediaTabLabl">
                    Questionnaire
                      </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`d-inline-flex flex-column justify-content-center align-items-center ${classnames({ active: activeTab === '4' })}`} onClick={() => { handleAvailable(false); toggle('4'); }}>
                  <span className="d-block">
                    <i className="material-icons">emoji_events</i>
                  </span>
                  <span className="d-block mediaTabLabl">
                    Reward
                    </span>
                </NavLink>
              </NavItem> <NavItem>
                <NavLink
                  className={`d-inline-flex flex-column 
                  justify-content-center align-items-center 
                  ${classnames({ active: activeTab === '5' })}`}
                   onClick={() => { handleAvailable(false); toggle('5'); }}>
                  <span className="d-block">
                    <i className="material-icons">description</i>
                  </span>
                  <span className="d-block mediaTabLabl">
                    PDF
                    </span>
                </NavLink>
              </NavItem>

            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <MediaVideo tab={activeTab} _handleMedia={(obj) => handleMedia({ ...obj, type: 'video' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'video' })} availableMedia={availableMedia.filter(e => e.type === 'video')} media={listData.media.filter(e => e.type === 'video')} editable={editable} />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <MediaContent tab={activeTab} _handleMedia={(obj) => handleMedia({ ...obj, type: 'contentPage' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'contentPage' })} availableMedia={availableMedia.filter(e => e.type === 'contentPage')} contentPages={listData.media.filter(e => e.type === 'contentPage')} editable={editable} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <MediaQuestionnaire tab={activeTab} _handleMedia={(obj) => handleMedia({ ...obj, type: 'questionnaire' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'questionnaire' })} availableMedia={availableMedia.filter(e => e.type === 'questionnaire')} Questionnaire={listData.questionnaire} editable={editable} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <MediaReward tab={activeTab} _handleMedia={(obj) => handleMedia({ ...obj, type: 'reward' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'reward' })} availableMedia={availableMedia.filter(e => e.type === 'reward')} rewards={listData.media.filter(e => e.type === 'reward')} editable={editable} />
                  </Col>
                </Row>
              </TabPane>
                <TabPane tabId="5">
                <Row>
                  <Col sm="12">
                    <MediaPdf tab={activeTab} _handleMedia={(obj) => handleMedia({ ...obj, type: 'pdf' })} _handleSelected={(obj) => handleSelected({ ...obj, type: 'pdf' })} availableMedia={availableMedia.filter(e => e.type === 'pdf')} rewards={listData.media.filter(e => e.type === 'pdf')} editable={editable} />
                  </Col>
                </Row>
              </TabPane>

            </TabContent>
          </div>
        </div>
      </div>
    </>
  )
};

export default Media;
