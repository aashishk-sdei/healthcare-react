import React, { useState, useEffect, createRef } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Row, Col, Button } from 'reactstrap';
import { Card, ListGroup, ListGroupItem } from "shards-react";
import MediaList from '../../mediaList/mediaList';
import MediaHeader from '../MediaHeader/MediaHeader';
import { TextBox } from '../../../../../../../../components/common/FormsInput';

import '../media.scss';
const MediaContent = ({ tab, _handleMedia, _handleSelected, contentPages, availableMedia }) => {
  const nameRef = createRef();
  const [name, setName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [errFlag, setErrFlag] = useState(false);
  const [description, setDescription] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('<p></p>'))));

  useEffect(() => {
    setErrFlag(false);
    setName('');
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('<p></p>'))))
    setIsSubmit(true);
    nameRef.current.props.onChange('');
  }, [tab]);

  const onEditorStateChange = (editorState) => {
    description.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    setEditorState(editorState);
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
  };

  const checkValidationAndSubmit = () => {
    setIsSubmit(false);
    nameRef.current.props.onChange(name);
    if (description === '' || name === '') { console.log("Values should not be empty"); setErrFlag(true); }
    else if (description.length <= 11) { setErrFlag(true); console.log("option must be there"); }
    else {
      setErrFlag(false);
      setName('');
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('<p></p>'))))
      setIsSubmit(true);
      nameRef.current.props.onChange('');
      _handleMedia({ name: name, mediaType: 'content', content: description });
    };
  }

  // select Content
  const isSelected = (id) => availableMedia.findIndex(e => e.mediaId === id) !== -1 ? true : false;

  return (
    <>
      <Card small className="addSectionWrapper shadow-none">
        <MediaHeader title='Add Content' buttonTitle='Select Content from List' />
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <div className="addSection">
                  <div className="addSection-rw d-flex">
                    <div className="position-relative editorBlock w-100">
                      <div className="fileLink flex1 mb-15">
                        <TextBox Name="Content Title" Placeholder="Enter Content Title" min={1} value={name} isRequired={!isSubmit} handleVal={(val) => setName(val)} ref={nameRef} />
                      </div>
                      <Editor editorState={editorState} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" onEditorStateChange={onEditorStateChange} />
                      {errFlag && description.length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                      <div className="editor-btm mt-3 text-right media-action-btn mb-15">
                        <Button color="primary" onClick={() => checkValidationAndSubmit()}>Save</Button>
                      </div>
                    </div>
                  </div>
                  <div className="addSection-rw">
                    <MediaList data={{ mediaType: "content", list: contentPages }} handleVal={val => _handleSelected(val)} isChecked={e => isSelected(e)} title='Select Content' />
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

export default MediaContent;
