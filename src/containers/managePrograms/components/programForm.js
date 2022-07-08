
import React, { useState, createRef } from "react";
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Multiselect } from 'multiselect-react-dropdown';
import classnames from 'classnames';
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Button, Form } from "shards-react";
import LessonList from '../program/lesson/lessonList';
import BrowseInputCell from '../../../components/common/BrowseInputCell/BrowseInputCell';
import { resetAll } from './../../../context/actions/general';


const ProgramForm = ({ details, Language, ProgramType, Condition, Program, Lession, LessionList, LessionsSelected, editable = false, submitData, cancel, handleCondition, programId, tab, toggleTab, history }) => {
  const dispatch = useDispatch();

  const languageRef = createRef();
  const nameRef = createRef();
  const typeRef = createRef();
  const straplineRef = createRef();
  const conditionRef = createRef();
  const newConditionRef = createRef();
  const [activeTab, setActiveTab] = useState(tab);
  const programRef = createRef();
  const view = details ? editable ? false : true : false;
  /* _________________________________________________________Tab 1____________________________________________________________________ */

  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length ? Language[0]['@rid'] : '');
  const [name, setName] = useState(details ? details['name'] : '');
  const [type, setType] = useState(details ? details['type'] : '');
  const [strapline, setStrapLine] = useState(details ? details['strapline'] : '');
  const [condition, setCondition] = useState(details ? details['condition'] : '');
  const [isSubmit, setIsSubmit] = useState(false);
  const [logourl, setLogo] = useState(details ? details['logourl'] : '');
  const [overview, setOverview] = useState(details ? details['overview'] : '');
  const [newCondition, setNewCondition] = useState('');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.overview.split('"').join("")).contentBlocks : htmlToDraft('<p></p>'))));

  const [multiSelectErr, setMultiSelectErr] = useState();

  const onEditorStateChange = (editorState) => {
    overview.length <= 15 ? setErrFlag(true) : setErrFlag(false);
    setEditorState(editorState);
    setOverview(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
  };

  /*_______________________________________________________Tab_________________________________________________________ */
  const [program, setProgram] = useState(details ? details['@rid'] : '');
  const [selectedLessions, setSelectedViews] = useState(LessionsSelected || []);

  const [modal, setModal] = useState(false);
  const conditionToggle = () => {
    setModal(!modal);
    setIsSubmit(true);
    setNewCondition('');
    newConditionRef.current.props.onChange('');
  }

  const handleConditionSubmit = () => {
    setIsSubmit(false);
    newConditionRef.current.props.onChange(newCondition);
    if (newCondition === '' || newCondition.replace(/\s+/g, ' ').trim().length === 0) console.log("Field is not valid");
    else if (newCondition !== '') {
      setModal(!modal);
      handleCondition(newCondition);
      setIsSubmit(true);
      setNewCondition('');
      newConditionRef.current.props.onChange('');
    }
  }

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = (val) => {
    if (activeTab == '1') {
      languageRef.current.props.onChange(language);
      nameRef.current.props.onChange(name);
      typeRef.current.props.onChange(type);
      straplineRef.current.props.onChange(strapline);
      conditionRef.current.props.onChange(condition);
      if (overview === '') setErrFlag(true);
      if (language === '' || name === '' || type === '' || condition === '') console.log("Values should not be empty");
      else if (overview.length <= 15) { setErrFlag(true); console.log("overview should not be empty."); }
      else {
        setErrFlag(false);
        let body = new FormData();
        (typeof logourl !== 'string') ? body.append("file", logourl) : body.append("logourl", logourl);
        body.append("name", name);
        body.append("language", language);
        body.append("strapline", strapline);
        body.append("type", type);
        body.append("condition", condition);
        body.append("overview", overview);
        body.append("status", status ? 1 : 2);
        if (val.continue === true) setActiveTab('2');
        if (details && details['@rid']) {
          body.append('recordId', details['@rid']);
          submitData({ body: body, recordId: details['@rid'] }, activeTab, val);
        } else {
          submitData({ body: body, recordId: '' }, activeTab, val);
        }
      };
    }
    else {
      if (!selectedLessions.length) setMultiSelectErr(true);
      else setMultiSelectErr(false);
      programRef.current.props.onChange(program);
      if (selectedLessions.length && !multiSelectErr) {
        if (program === '' || !selectedLessions.length) console.log('Values should not be empty');
        else if (program.length <= 1 && !selectedLessions.length) console.log('Values should be selected at least once');
        else {
          let payload = { program: program, lessonArr: selectedLessions, status: status ? 1 : 2 };
          if (details && details['@rid']) payload['recordId'] = details['@rid'];
          submitData(payload, activeTab);
        }
      }
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const onSelect = (selectedList, selectedItem) => {
    selectedLessions.push({ name: selectedItem.name, rid: selectedItem['@rid'] });
    setSelectedViews([...selectedLessions]);
  }
  const onRemove = (selectedList, removedItem) => {
    let indx = selectedLessions.findIndex(e => e.rid == removedItem.rid);
    selectedLessions.splice(indx, 1);
    setSelectedViews(selectedLessions);
  }
  const handleEducationTab = () => {
    if (details) {
      toggle('2');
      toggleTab('2');
    }
  }

  return (
    <div className="tabWrapper">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggleTab('1'); toggle('1'); }}
          >
            Program Details
          </NavLink>
        </NavItem>
        <NavItem disabled={details ? true : false}>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => handleEducationTab()}
          >
            Education
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form>
            <Row form>
              <Col lg="6" className="form-group">
                <SelectBox Name="Language" Placeholder="Select Language" val={language} options={Language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Program Name" Placeholder="Program Name" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <SelectBox Name="Program Type" Placeholder="Program Type" val={type} options={ProgramType} handleVal={(val) => setType(val)} edit={editable} ref={typeRef} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Program StrapLine" Placeholder="Program StrapLine" min={1} isRequired={false} value={strapline} handleVal={(val) => setStrapLine(val)} edit={editable} ref={straplineRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <SelectBox button={true} className="inputBtnWrapper" Name="Select Condition" Placeholder="Select Condition" val={condition} options={Condition} handleVal={(val) => setCondition(val)} edit={editable} ref={conditionRef} onClick={() => setModal(!modal)} view={view} />
              </Col>
              <Col lg="6" className="form-group">
                <label>Program Logo</label>
                <BrowseInputCell view={details ? editable ? false : true : false} logoUrl={logourl} handleImageSelect={(file) => setLogo(file)} />
              </Col>
              <Col md="12" className="form-group">
                <label className="d-block">Description
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                <div className="position-relative">
                  <Editor editorState={editorState} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" onEditorStateChange={onEditorStateChange} />
                  {errFlag && overview.length <= 15 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                </div>
              </Col>
              <Col lg="6" className="form-group">
                <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
              </Col>
            </Row>
            <div className='formBtns text-right'>
              {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
              {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit({ 'continue': false })}>Update & Exit</Button> : '') : ''}
              {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit({ 'continue': true })}>Update & Continue</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit({ 'continue': false })}>Save</Button>}
            </div>
          </Form>
        </TabPane>
        {/* Second Tab */}
        <TabPane tabId="2">
          <Row form>
            <Col lg="6" className="form-group">
              <SelectBox Name="Select Program" Placeholder="Select Program" val={program} options={Program} handleVal={(val) => setProgram(val)} edit={details ? false : true} ref={programRef} />
            </Col>
            <Col lg="6" className="form-group">
              <label>Select Lessons</label>
              <div className="multiselectWrapper position-relative d-flex category-module-drop custom-category-module" >
                <div className="multiselectCol flex-fill mr-2">
                  <Multiselect
                    options={Lession} // Options to display in the dropdown
                    selectedValues={selectedLessions}
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    disable={editable ? '' : 'true'}
                    onChange={() => { }}
                  />
                  {multiSelectErr && !selectedLessions.length && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                </div>
                {<Button theme="link" onClick={() => { dispatch(resetAll()); !view && programId !== '' && history.push(`/add-lesson`) }}>
                  <Button theme="accent" className="rounded-circle p-0 inputAddBtn2" disabled={view}>
                    <i className="material-icons">add</i>
                  </Button>
                </Button>}
              </div>
            </Col>
            {LessionList.length ? <Col sm="12">
              <LessonList history={history} programId={programId} LessionList={LessionList} view={view} />
            </Col> : ''}
            <Col sm="12">
              <div className='formBtns text-right mt-3 text-right'>
                {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
              </div>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

      {/* Conditon Modal */}
      <Modal isOpen={modal} toggle={conditionToggle}>
        <ModalHeader toggle={conditionToggle}>Select Condition</ModalHeader>
        <ModalBody>
          <TextBox Name={false} Placeholder="Add Condition" min={1} value={newCondition} isRequired={!isSubmit} handleVal={(val) => setNewCondition(val)} edit={true} ref={newConditionRef} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => handleConditionSubmit()}>Done</Button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default ProgramForm;