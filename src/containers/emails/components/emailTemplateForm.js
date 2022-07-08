import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, EmailBox, CheckBox, TextAreaBox, SelectBox } from '../../../components/common/FormsInput';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML, Modifier, SelectionState, AtomicBlockUtils } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
const EmailTypeFrom = ({ title, details, editable = false, submitData, cancel, emailTypes, languages, tags }) => {

  const nameRef = createRef();
  const emailTypeRef = createRef();
  const languageRef = createRef();
  const fromRef = createRef();
  const subjectRef = createRef();
  const tagRef = createRef();

  const [name, setName] = useState(details ? details['name'] : '')
  const [subject, setSubject] = useState(details ? details['subject'] : '')
  const [from, setFrom] = useState(details ? details['email_from'] : '')
  const [emailType, setEmailType] = useState(details ? details['email_type'] : '')
  const [language, setLanguage] = useState(details ? details["language"] : languages && languages.length > 0 ? languages[languages.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [tag, setTag] = useState(details ? details["tag"] : "");
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [lastCursor, setLastCursor] = useState(0);
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== "undefined") ? htmlToDraft(details.content.split('"').join("")).contentBlocks : htmlToDraft(""))));
  const [content, setContent] = useState(details ? details["content"] : "");
  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    languageRef.current.props.onChange(language);
    emailTypeRef.current.props.onChange(emailType);
    fromRef.current.props.onChange(from);
    subjectRef.current.props.onChange(subject);
    if (!tag) tagRef.current.props.onChange(tag);
    content === '' || content.length < 12 ? setErrFlag(true) : setErrFlag(false);
    if (name === '' || emailType === '' || subject === '' || from === '' || tag === '') console.log("Values should not be empty");
    else if (content.length <= 11) console.log("Content should have more then 4 is requioed.");
    else {
      let typeTypeObj = emailTypes.find(e => e['@rid'] === emailType);
      let payload = { name: name, content: content, tag: tag, emailTypeName: typeTypeObj.name, from: from, subject: subject, emailType: emailType, language: language, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }

  const onEditorStateChange = (editorState) => {
    setContent(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    const currentSelection = editorState.getSelection();
    setLastCursor(currentSelection);
    setEditorState(editorState);
    JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))).length < 12 ? setErrFlag(true) : setErrFlag(false)
  };

  // set tag
  const setTageToContent = tg => {
    let newTag = '{' + tg + '}';
    const currentContent = editorState.getCurrentContent();
    const newContent = Modifier.replaceText(
      currentContent,
      lastCursor,
      newTag
    );
    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    const newEdt = EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    setContent(
      JSON.stringify(draftToHtml(convertToRaw(newEdt.getCurrentContent())))
    );
    setEditorState(newEdt);
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
                      <SelectBox Name="Choose language" Placeholder="Select language" options={languages} val={language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Choose Email Type" Placeholder="Choose Email Type" options={emailTypes} val={emailType} handleVal={(val) => setEmailType(val)} edit={editable} ref={emailTypeRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Template Name" Placeholder="Enter Template Name" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col md="6" className="form-group">
                      <EmailBox Name="Email" Placeholder="From" value={from} handleVal={(val) => setFrom(val)} edit={editable} ref={fromRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Subject" Placeholder="Enter Subject" min={1} value={subject} handleVal={(val) => setSubject(val)} edit={editable} ref={subjectRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Insert tag" Placeholder="Enter Insert Tag" val={tag} handleVal={val => { if (content && lastCursor) { setTag(val); val && setTageToContent(val); } else if (val) { toast.warn("Please click to content where you want to apply tag"); } }} options={tags} optName="email_tag" optVal="email_tag" edit={editable} ref={tagRef} />
                    </Col>
                    <Col md="12" className="form-group">
                      <label className="d-block">Content
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                      <Editor
                        editorState={editorState}
                        wrapperClassName={"wrapperClassName " + (!editable ? "custom-disable-editor" : "")}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                      {(errFlag && content === "") || (errFlag && content.length < 12) ?
                        <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required.</div>
                        : ''
                      }
                    </Col>
                    {/* Status */}
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
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

export default EmailTypeFrom;
