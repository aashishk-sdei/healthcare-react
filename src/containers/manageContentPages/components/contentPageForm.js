import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const ContentPageForm = ({ details, dependentPages, editable = false, submitData, cancel }) => {

  const nameRef = createRef();
  const slugRef = createRef();
  const parentIdRef = createRef();

  const [name, setName] = useState(details ? details['name'] : '');
  const [slug, setSlug] = useState(details ? details['slug'] : '');
  const [content, setContent] = useState(details ? details['content'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.content.split('"').join("")).contentBlocks : htmlToDraft(""))));

  const onEditorStateChange = (editorState) => {
    setContent(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    setEditorState(editorState);
  };

  const [parentId, setParentId] = useState(details ? details['parentId'].toString() : dependentPages && dependentPages.length && dependentPages[0]['id']);

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    slugRef.current.props.onChange(slug);
    if (parentId === '') parentIdRef.current.props.onChange(parentId);
    content.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    if (name === '' || slug === '' || parentId === '') console.log("Values should not be empty");
    else if (content.length <= 11) console.log("Content should have more then 4 is requioed.");
    else {
      let payload = { name: name, slug: slug, parentId: parentId, content: content, status: status ? 1 : 2 };
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
                      <TextBox Name="Page Name" Placeholder="Page Name" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Page Slug" Placeholder="Page Slug" min={1} value={slug} handleVal={(val) => setSlug(val)} edit={editable} ref={slugRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Dependent On" Placeholder="Select Dependent Page" val={parentId} optVal='id' options={dependentPages} handleVal={(val) => setParentId(val)} edit={editable} ref={parentIdRef} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label className="d-block">Content
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={"wrapperClassName " + (!editable ? "custom-disable-editor" : "")}
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable}
                      />
                      {errFlag && content.length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required.</div>}
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

export default ContentPageForm;
