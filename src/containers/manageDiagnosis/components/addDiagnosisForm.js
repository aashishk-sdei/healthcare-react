import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { Editor } from 'react-draft-wysiwyg';
import TableList3 from '../../../components/common/TableList/TableList3';
import { toast } from "react-toastify";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
const DiagnosisFrom = ({ title, details, editable = false, submitData, cancel, search_ICD, ICDCodes, languages }) => {

  const nameRef = createRef();
  const languageRef = createRef();
  let langCode = details.language ? languages.filter(e => e._id === details.language)[0].code : 'en';
  const [language, setLanguage] = useState(details ? details.language : '');
  const [name, setName] = useState(details ? details.name && details.name : '')
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [selectedId, setSelectedId] = useState(details ? details.icd_code && details.icd_code.split(',') : []);
  const [icdCode, setIcdCode] = useState(details ? details.icd_code && details.icd_code.split(',') : []);
  const [keyword, setKeyword] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== "undefined") ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));
  const [description, setDescription] = useState(details ? details.description && details.description : "");
  const _handleKeypress = (e) => checkValidationAndSubmit();

  const checkValidationAndSubmit = (point = false) => {
    nameRef.current.props.onChange(name);
    if (name !== '' && selectedId.length === 0)
      toast.warn('Please add atleast one ICD code');
    if (name === '' || selectedId.length === 0) console.log("Values should not be empty");
    else {
      let payload = { name: name, point: point, language: language, description: description, icd_code: selectedId, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }
  const onEditorStateChange = (editorState) => {
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    setEditorState(editorState);
  };

  const setLang = (id) => {
    const filterLan = languages.filter(e => e._id === id);
    if (details && details.name[filterLan[0].code]) {
      setName(details.name[filterLan[0].code]);
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description[filterLan[0].code].split('"').join("")).contentBlocks : htmlToDraft(""))))
    }
  }
  const search = () => {
    search_ICD(keyword);
  };

  const removeCode = async (index) => {
    selectedId.splice(index, 1);
    icdCode.splice(index, 1);
    setIcdCode([...icdCode]);
    setSelectedId([...selectedId]);

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
                      <SelectBox Name="language" Placeholder="Select language" val={language} optVal='_id' optNameChild="en" options={languages} handleVal={(val) => { setLanguage(val); setLang(val); }} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Diagonsis Name" Placeholder="Diagonsis name" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col md="12" className="form-group">
                      <label className="d-block">Description</label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                    </Col>
                    {details && icdCode.length > 0 ? <Col md="12 " className="form-group">
                      <div className="diagnose-dv">
                        {icdCode && icdCode.map((e, i) => <div className="diagnose-inner" style={!editable ? { 'pointerEvents': 'none', 'opacity': '0.4' } : {}} key={i} >{e}<span onClick={() => { removeCode(i) }}><i className="fa fa-times" aria-hidden="true"></i></span></div>
                        )}
                      </div>
                    </Col> : ''}
                  </Row>
                  {editable && <Row form>
                    <Col md="12" className="form-group">
                      <div className="icd-outer">
                        <div className="icd-label">
                          <TextBox Name="Search ICD code" Placeholder="ICD code, description, ICD category" value={keyword} isRequired={false} handleVal={(val) => setKeyword(val)} edit={editable} handleKeypress={(e) => search()} />
                        </div>
                        <div className="icd-button">
                          < Button theme="accent" disabled={!editable ? true : false} onClick={() => search()} >Search</Button>
                        </div>
                      </div>
                    </Col>
                    <Col md="12 " className="form-group">
                      {ICDCodes && ICDCodes.length > 0 && <div className="pathway-table"> <TableList3 list={ICDCodes}
                        handleSelectedAction={val => { setSelectedId(val) }}
                        selectedCode={selectedId}
                        type={'ICD'} /> </div>}
                    </Col>
                  </Row>}
                  {/* Status */}
                  <Row>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
                    </Col>
                    {/* <FormButtons className="text-right" /> */}
                  </Row>
                  <div className='formBtns text-right'>
                    {details ? '' : < Button theme="accent float-left" onClick={() => checkValidationAndSubmit(true)}>Add + Save</Button>}
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Save + Add Problem</Button>}
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

export default DiagnosisFrom;
