import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const ICDCategoriesForm = ({ title, details, editable = false, submitData, cancel, categoryType, languages }) => {
  const nameRef = createRef();
  const parentRef = createRef();
  const languageRef = createRef();
  let langCode = details.language ? languages.filter(e => e._id === details.language)[0].code : 'en';
  const [language, setLanguage] = useState(details ? details.language : '');
  const [name, setName] = useState(details ? details.name[langCode] : '');
  const [description, setDescription] = useState(details ? details.description[langCode] : '');
  const [parent, setParent] = useState(details ? !details.parent ? "null" : details.parent : categoryType && categoryType.length && categoryType[0]._id);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description[langCode].split('"').join("")).contentBlocks : htmlToDraft(""))));
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const setLang = (id) => {
    const filterLan = languages.filter(e => e._id === id);
    if (details && details.name[filterLan[0].code]) {
      setName(details.name[filterLan[0].code]);
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description[filterLan[0].code].split('"').join("")).contentBlocks : htmlToDraft(""))))
    }
  }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    if (parent === '') parentRef.current.props.onChange(parent);
    else if (name === '' || parent === '') console.log("Values should not be empty");
    else if (name.length < 1) console.log("Name should have more then 1 is requioed.");
    else {
      let payload = { name: name, description: description, language: language, parent: parent !== 'null' ? parent : '', status: status ? 1 : 2 };
      if (details && details._id) payload = { ...payload, recordId: details._id };
      submitData(payload);
    };
  }

  const onEditorStateChange = (editorState) => {
    setDescription(
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
    setEditorState(editorState);
    // JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))).length < 12 ? setErrFlag(true) : setErrFlag(false)
  };

  return (
    <>
      <Card small className="mb-4" >
        {/* <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader> */}
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="language" Placeholder="Select language" val={language} optVal='_id' optNameChild="en" options={languages} handleVal={(val) => { setLanguage(val); setLang(val); }} edit={editable} ref={languageRef} />
                    </Col>
                    {/* Name */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Name" Placeholder="Category Name" min={1} value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={nameRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Type" Placeholder="Category Type" val={parent} optVal='_id' isSub='true' optNameChild="en" options={categoryType} handleVal={(val) => setParent(val)} edit={editable} ref={parentRef} />
                    </Col>
                  </Row>
                  <Row form>
                    {/* TextArea */}
                    <Col md="12" className="form-group">
                      <label className="d-block">Category Description
                      {/* <span style={{ 'color': '#ff0000' }}>  *</span> */}
                      </label>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={"wrapperClassName " + (!editable ? "custom-disable-editor" : "")}
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable}
                      />
                      {/* {errFlag && categoryDescription.length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required.</div>} */}
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
      </Card >
    </>
  );
}

export default ICDCategoriesForm;
