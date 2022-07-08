import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const ProgramForm = ({ title, details, Language, editable = false, submitData, cancel }) => {

  const languageRef = createRef();
  const ProgramTypeRef = createRef();

  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length ? Language[0]['@rid'] : '');
  const [programType, setProgramType] = useState(details ? details['name'] : '');
  const [description, setDescription] = useState(details ? details['description'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft('<p></p>'))));

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
  };

  const _handleKeypress = (e) => {
    e.preventDefault();
    checkValidationAndSubmit();
    return false;
  }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    ProgramTypeRef.current.props.onChange(programType);
    description.length <= 11 ? setErrFlag(true) : setErrFlag(false);

    if (language === '' || programType === '' || description === '') console.log("Values should not be empty");
    else if (description.length <= 11) console.log("Description should have more then 4 is required.");
    else {
      let payload = { language: language, name: programType, description: description, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }
  return (
    <>
      <Card small className="mb-4" >
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Language" Placeholder="Select Language" val={language} options={Language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Program Type" Placeholder="Program Type" min={1} value={programType} handleVal={(val) => setProgramType(val)} edit={editable} ref={ProgramTypeRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label className="d-block">Description
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                      />
                      {errFlag && description.length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? <Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : <Button theme="accent" onClick={(e) => checkValidationAndSubmit()}>Submit</Button>}
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

export default ProgramForm;
