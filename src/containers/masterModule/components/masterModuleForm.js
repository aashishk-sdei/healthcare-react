import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { Multiselect } from 'multiselect-react-dropdown';
import { TextBox, CheckBox } from '../../../components/common/FormsInput';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const MasterModuleForm = ({ title, collections, details, editable = false, flag = false, submitData, cancel }) => {

  const nameRef = createRef(); const descriptionRef = createRef();
  const [name, setName] = useState(details ? details['moduleName'] : '');
  const [description, setDescription] = useState(details ? details['description'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [errFlag, setErrFlag] = useState(false);
  //selected collections
  const [selectedCollections, setSelectedCollections] = useState(details ? JSON.parse(details['collections']) : []);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(''))));

  const _handleKeypress = (e) => {
    if (e.keyCode === 13) checkValidationAndSubmit();
  }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    description.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    if (name === '' || description === '') console.log("Values should not be empty");
    else if (name.length < 1 || description.length <= 11) console.log("name and Description should have more then 4 is requioed.");
    else {
      let payload = { name: name, description: description, collectionArr: selectedCollections, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
  };

  //Select collection from multiselect box
  const onSelect = (selectedList, selectedItem) => {
    selectedCollections.push(selectedItem);
    setSelectedCollections(selectedCollections);
  }

  //Remove collection from multiselect box
  const onRemove = (selectedList, removedItem) => {
    let indx = selectedCollections.findIndex(e => e.name == removedItem.name);
    selectedCollections.splice(indx, 1);
    setSelectedCollections(selectedCollections);
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
                    {/* Name */}
                    <Col md="6" className="form-group">
                      {/* <SelectBox Name="Name" Placeholder="Select Module Name" val={details ? details['moduleName'] : ''} optName='title' optVal='title' options={modules} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} /> */}
                      <TextBox Name="Name" Placeholder="Enter Name" min={1} value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col lg="6" className="form-group">
                      <label>Select Module Collection(s) </label>
                      {console.log("flag: ", flag)}
                      <div className="multiselectWrapper position-relative d-flex category-module-drop">
                        <div className="multiselectCol flex-fill mr-2">
                          <Multiselect
                            options={collections} // Options to display in the dropdown
                            selectedValues={selectedCollections}
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            disable={details ? true : false}
                          />
                          {/* {multiSelectErr && !selectedLessions.length && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>} */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row form>
                    {/* Description */}
                    <Col md="12" className="form-group">
                      <label className="d-block">Description
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>

                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                      {errFlag && description.length <= 11 &&
                        <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>
                        // : errFlag && description.length < 21 ? <div className="invalid-feedback" style={{ 'display': 'block' }}>This field should be at least 10 characters long.</div> : ''
                      }
                    </Col>
                  </Row>
                  <Row>
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
      </Card>
    </>
  );
}

export default MasterModuleForm;
