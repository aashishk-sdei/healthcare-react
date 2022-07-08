import React from "react";
import { Row, Col } from 'reactstrap';
import { Card, ListGroup, ListGroupItem } from "shards-react";
import MediaList from '../../mediaList/mediaList';
import MediaHeader from '../MediaHeader/MediaHeader';

const MediaQuestionnaire = ({ _handleSelected, Questionnaire, availableMedia }) => {

  // select questionnaire
  const isSelected = (id) => {
    return availableMedia.findIndex(e => e.quest_id === id) !== -1 ? true : false;
  }

  return (
    <>
      <Card small className="addSectionWrapper shadow-none">
        <MediaHeader title='Add Questionnaire' buttonTitle='Select Questionnaire from List' />
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <div className="addSection">
                  <div className="addSection-rw">
                    <MediaList data={{ mediaType: "questionnaire", list: Questionnaire }} handleVal={val => _handleSelected(val)} isChecked={e => isSelected(e)} title='Select Questionnaire' />
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>

    </>
  )
};

export default MediaQuestionnaire;
