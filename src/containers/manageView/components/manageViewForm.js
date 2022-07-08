import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const ManageViewForm = ({ title, details, editable = false, flag = false, submitData, cancel }) => {
  console.log(details);
  const nameRef = createRef();
  const [name, setName] = useState(details ? details['name'] : '');
  const [description, setDescription] = useState(details ? details['description'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));

  const onEditorStateChange = (editorState) => {
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    setEditorState(editorState);
  };

  const _handleKeypress = (e) => {
    e.preventDefault();
    checkValidationAndSubmit();
    return false;
  }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    description.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    if (name === '' || description === '') console.log("Values should not be empty");
    else if (name.length < 1 || description.length <= 11) console.log("name and Description should have more then 4 is requioed.");
    else {
      let payload = { name: name, description: description, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }

  return (
    <>
      <Card small className="mb-4" >
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <TextBox Name="Name" Placeholder="Enter Name" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label className="d-block" htmlFor="feDesc">Description
                      <span style={{ 'color': '#ff0000' }}> *</span></label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                      {errFlag && description.length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
                    </Col>
                  </Row>

                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
}

export default ManageViewForm;