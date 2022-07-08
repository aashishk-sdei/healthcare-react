import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { TextBox, CheckBox, SelectBox, GroupSelectBox, ParentGroupSelectBox } from '../../../components/common/FormsInput';
import { QuestionsFor, AnswerTypes, Points } from './../../../utils/constants';
import ValidationAlert from './../../../components/common/Modal/ValidationAlert/ValidationAlert';
import AnswerTypeModal from '../../../components/common/Modal/AnswerTypeModal/AnswerTypeModal';


const QuestionForm = ({ details, categories, Language, questions, editable = false, submitData, cancel }) => {
  const languageRef = createRef();
  const categoryRef = createRef();
  const dependencyQuestionRef = createRef();
  const questionRef = createRef();
  const answerTypeRef = createRef();
  const questionForRef = createRef();
  const setPointsRef = createRef();

  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length > 0 ? Language[Language.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [category, setCategory] = useState(details ? details['category'] : '');
  const [dependencyQuestion, setDependencyQuestion] = useState(details ? details['dependencyQuestion'].toString() : questions && questions.length && questions[0]['id']);
  const [question, setQuestion] = useState(details ? details['question'] : '');
  const [answerType, setAnswerType] = useState(details ? details['answerType'].toString() : '');
  const [answerTypes, setAnswerTypes] = useState(details ? details['answerTypeOptions'].sort((a, b) => a.id - b.id) : []);
  const [splicedOpt, setSplicedOpt] = useState([]);
  const [questionFor, setQuestionFor] = useState(details ? details['questionFor'].toString() : '');
  const [points, setPoints] = useState(details ? details['points'] : '0');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [valFlag, setValFlag] = useState(false);
  const [description, setDescription] = useState(details ? details['description'] : '');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(details && typeof details !== 'undefined' && details.description ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));
  let filterQurstion = questions.filter(e => e.category === category || e.id === Number(dependencyQuestion) || e.id === 0);
    // debugger


  const [modal, setModal] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);
  const toggle = () => setModal(!modal);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
  };


  const handleDeleteOpt = (id) => {
    let options = answerTypes;
    let spliced = options.splice(id, 1);
    spliced[0]['status'] = 0;
    setSplicedOpt([...splicedOpt, ...spliced]);
    setAnswerTypes([...options]);
  }

  const handleEditOpt = (id, val) => {
    let options = answerTypes;
    options[id]['name'] = val;
    setAnswerTypes([...options]);
  }

  const handleAddOpt = (val) => {
    let options = answerTypes;
    const option = { name: val.toString(), answerType: answerType, question: '', status: 1 };
    options.push(option);
    setAnswerTypes([...options]);
  }

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    categoryRef.current.props.onChange(category);
    // dependencyQuestionRef.current.props.onChange(dependencyQuestion);
    questionRef.current.props.onChange(question);
    answerTypeRef.current.props.onChange(answerType);
    questionForRef.current.props.onChange(questionFor);
    setPointsRef.current.props.onChange(points);

    if (language === '' || category === '' || question === '' || dependencyQuestion === '' || questionFor === '' || answerType === '' || points === '') console.log("Values should not be empty");
    else if ((answerType === '2' || answerType === '3' || answerType === '4') && answerTypes.length === 0) { setValFlag(true); setOpen(true); console.log("option must be there"); }
    else {
      setValFlag(false);
      setOpen(false);
      let payload = { language: language, category: category, dependencyQuestion: dependencyQuestion, description: description, question: question, answerType: answerType, answerTypes: [...answerTypes, ...splicedOpt], questionFor: questionFor, points: points, status: status ? 1 : 2 };
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
                      <ParentGroupSelectBox Name="Category" Placeholder="Select Category" optName="categoryName" val={category} options={categories} handleVal={(val) => setCategory(val)} edit={editable} ref={categoryRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <ParentGroupSelectBox Name="Dependency Question" Placeholder="Select Dependency Question" optName="question" optVal="id" val={dependencyQuestion} options={filterQurstion} handleVal={(val) => setDependencyQuestion(val)} edit={editable} ref={dependencyQuestionRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Question" Placeholder="Question" min={1} value={question} handleVal={(val) => setQuestion(val)} edit={editable} ref={questionRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Answer Type" Placeholder="Select Answer Type" val={answerType} options={AnswerTypes} handleVal={(val) => setAnswerType(val)} edit={editable} ref={answerTypeRef} />
                      {(answerType === '2' || answerType === '3' || answerType === '4') && <Button className="inputAddOnBtn border-0 shadow-none mt-2" theme={valFlag ? 'primary' : 'primary'} color="link" onClick={() => setModal(true)}>Add/Remove Answers</Button>}
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Question For" Placeholder="Select Question For" val={questionFor} options={QuestionsFor} handleVal={(val) => setQuestionFor(val)} edit={editable} ref={questionForRef} />
                    </Col>
                    <Col md="12" className="form-group">
                      <label className="d-block">Helper text</label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Points" Placeholder="Select Points" val={points} options={Points} handleVal={(val) => setPoints(val)} edit={editable} ref={setPointsRef} />
                    </Col>
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
      <Modal isOpen={isOpen} toggle={toggleOpen} className='confirmModal'>
        <ModalHeader toggle={toggleOpen}>Validation Error</ModalHeader>
        <ModalBody className=''>
          {valFlag && <ValidationAlert confirm={() => { setOpen(!isOpen) }} />}
        </ModalBody>
      </Modal>
      {modal ? <AnswerTypeModal isOpen={modal} toggleModal={() => toggle()} editable={editable} options={answerTypes} addOpt={(val) => handleAddOpt(val)} editOpt={(id, val) => handleEditOpt(id, val)} deleteOpt={(id) => handleDeleteOpt(id)} /> : ''}
    </>
  );
}

export default QuestionForm;
