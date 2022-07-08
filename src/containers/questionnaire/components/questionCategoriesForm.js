import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, TextAreaBox, CheckBox, SelectBox, ColourPickerBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const QuestionCategoriesForm = ({ details, categories, Language, editable = false, submitData, cancel }) => {

  const languageRef = createRef();
  const categoryNameRef = createRef();
  const parentIdRef = createRef();
  const colourRef = createRef();
  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length > 0 ? Language[Language.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [categoryName, setCategoryName] = useState(details ? details['categoryName'] : '');
  const [parentId, setParentId] = useState(details ? details['parentId'].toString() : categories && categories.length && categories[0]['id']);
  const [description, setDescriptioin] = useState(details ? details['description'] : '');
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));
  const [colour, setColour] = useState(details ? details['colour'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const onEditorStateChange = (editorState) => {
    setDescriptioin(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    setEditorState(editorState);
  };

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    categoryNameRef.current.props.onChange(categoryName);
    parentIdRef.current.props.onChange(parentId);
    colourRef.current.props.onChange(colour);
    if (language === '' || categoryName === '' || parentId === '' || colour === '') console.log("Values should not be empty");
    else if (language.length <= 1 || categoryName.length < 1 || colour.length <= 2) console.log("categoryName and icdDescription should have more then 4 is requioed.");
    else {
      let payload = { categoryName: categoryName, language: language, parentId: parentId, description: description, colour: colour, status: status ? 1 : 2 };
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
                      <SelectBox Name="Language" Placeholder="Select Language" val={language} options={Language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Category Name" Placeholder="Category Name" min={1} value={categoryName} handleVal={(val) => setCategoryName(val)} edit={editable} ref={categoryNameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Parent" Placeholder="Select Parent Category" val={parentId} optVal='id' options={categories} handleVal={(val) => setParentId(val)} edit={editable} ref={parentIdRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <ColourPickerBox Name="Colour" Placeholder="Colour" value={colour} handleVal={(val) => setColour(val)} edit={editable} ref={colourRef} />
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
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card >
    </>
  );
}

export default QuestionCategoriesForm;
