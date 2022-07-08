import React, { useState, useEffect, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, TextAreaBox, SelectBox } from '../../../components/common/FormsInput';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const GoalFrom = ({ title, details, editable = false, submitData, cancel, parm, diagnosis, dignosisSeleted, problemList, languageList, goalTypeList }) => {

    const diagnosisRef = createRef();
    const problemRef = createRef();
    const goalTypeRef = createRef();
    const languageRef = createRef();

    const [language, setLanguage] = useState(details ? details['language'] : languageList && languageList.length > 0 ? languageList[languageList.findIndex(e => e.name === 'English')]['@rid'] : '');
    const [diagnos, setDiagnos] = useState(details ? details['diagnosis'] : dignosisSeleted)
    const [problem, setProblem] = useState(details ? details['problem'] : parm ? parm : '')

    const [goals, setGoals] = useState(details ? [details] : [{ name: '', goal_type: 'Short Term', short_description: '', long_description: '', status: 1 }]);
    const [flag, setFlag] = useState(false);
    const [longDescriptions, setLongDescriptions] = useState([EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.long_description.split('"').join("")).contentBlocks : htmlToDraft("")))]);

    // let filterProblemList = problemList.filter(e => e.diagnosis === diagnos || e.id === 0);

    useEffect(() => {
        goals.map((item, idx) =>  item.status = item.status === 2 ? false : 1)
        setGoals(goals);
    }, []);

    const _handleKeypress = () => checkValidation();

    const checkValidation = async () => {
        goals.map(async (x, i) => await setFlag(x.name.replace(/\s+/g, ' ').trim() === '' || x.goal_type.replace(/\s+/g, ' ').trim() === ''  || x.short_description.replace(/\s+/g, ' ').trim() === '' ? true : false));
    }

    const checkValidationAndSubmit = (point = false) => {
        diagnosisRef.current.props.onChange(diagnos);
        problemRef.current.props.onChange(problem);
        goals.map(async (x, i) => await setFlag(x.name.replace(/\s+/g, ' ').trim() !== '' && x.goal_type.replace(/\s+/g, ' ').trim() !== '' && x.short_description.replace(/\s+/g, ' ').trim() !== '' ? false : true));
        if (flag || diagnos === '' || problem === '') console.log("Values should not be empty");
        else {
            goals.map(item=>item.status === false?2:1);
            let payload = { point: point, diagnosis: diagnos,language:language, problem: problem, goals: JSON.stringify(goals) };

            if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
            submitData(payload);
        };
    }

    const longDescriptionChange = (editorStateval, index) => {
        let shortField = [...goals];
        let neweditstate = [...longDescriptions]
        shortField[index].long_description = JSON.stringify(draftToHtml(convertToRaw(editorStateval.getCurrentContent())));
        setGoals([...shortField])
        neweditstate[index] = editorStateval;
        setLongDescriptions([...neweditstate]);
    };

    const handleAddFields = () => {
        setGoals([...goals, { name: '', goal_type: 'Short Term', short_description: '', long_description: '', status: 1 }]);
        setFlag(true);
    };

    // handle click event of the Remove button
    const handleRemoveFields = index => {
        let list = [...goals];
        list.splice(index, 1);
        setGoals(list);
    };

    const onChangeVal = (fieldname, index, value) => {
        let shortField = [...goals];
        shortField[index][fieldname] = value;
        shortField.map(async (x, i) => await setFlag(x.name.replace(/\s+/g, ' ').trim() === '' || x.goal_type.replace(/\s+/g, ' ').trim() === '' || x.short_description.replace(/\s+/g, ' ').trim() === '' ? true : false));
        setGoals([...shortField]);
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
                                         {/* Select */}
                                         <Col md="6" className="form-group">
                                        <SelectBox Name="Language" Placeholder="Language" val={language} options={languageList} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Diagnosis" Placeholder="Select Diagnosis" val={diagnos} options={diagnosis} handleVal={(val) => setDiagnos(val)} edit={editable} ref={diagnosisRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Problem" Placeholder="Select Problem" val={problem} options={problemList} handleVal={(val) => setProblem(val)} edit={editable} ref={problemRef} />
                                        </Col>
                                    </Row>
                                    {goals.map((item, idx) => {
                                        return (
                                            <Row key={idx} form className="dynamicFiledSection goals-row mt-30">
                                                <Col md="12" className="form-group text-right problem-action-outer">
                                                    <div className="problem-action-btn">{!item['@rid'] && goals.length !== 1 && < Button theme="accent" className="removeicon" onClick={() => handleRemoveFields(idx)}><i className="material-icons">clear</i></Button>}</div>
                                                </Col>
                                                {/* {editable && (goals.length -1)===idx && <Button className="problem-del"  onClick={handleAddFields}><i className="material-icons">add</i></Button>} */}
                                                <Col md="6" className="form-group">
                                                    <TextBox Name="Goal" Placeholder="Goal" min={1} value={item.name} handleVal={(val) => onChangeVal('name', idx, val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} dynamic={true} />
                                                    {flag && item.name.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                </Col>
                                                {/* Select */}
                                                <Col md="6" className="form-group">
                                                    <SelectBox Name="Goal Type" Placeholder="Select Goal Type" val={item.goal_type} optVal='key' optName='value' options={goalTypeList} handleVal={(val) => onChangeVal('goal_type', idx, val)} edit={editable} ref={goalTypeRef} dynamic={true} />
                                                    {flag && item.goal_type.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                </Col>
                                                <Col md="12" className="form-group">
                                                    <TextAreaBox Name="Short Description" Placeholder="Short Description" min={1} value={item.short_description} handleVal={(val) => onChangeVal('short_description', idx, val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} dynamic={true} />
                                                    {flag && item.short_description.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                </Col>
                                                <Col md="12" className="form-group">
                                                    <label>Long Description</label>
                                                    <Editor
                                                        editorState={longDescriptions[idx]}
                                                        onEditorStateChange={val => longDescriptionChange(val, idx)}
                                                        readOnly={!editable ? true : false}
                                                    />
                                                </Col>
                                                {/* Status */}
                                                <Col md="6" className="form-group">
                                                    <CheckBox Name="Status" className="withInput" value={item.status} handleVal={() => onChangeVal('status', idx, !item.status)} edit={editable ? true : false} />
                                                </Col>
                                                {/* {!item['@rid'] && goals.length !== 1 && < Button theme="accent" className="removeicon" onClick={() => handleRemoveFields(idx)}><i className="material-icons">clear</i></Button>} */}
                                            </Row>
                                        )
                                    })}

                                    <div className='formBtns text-right'>
                                        {editable ? <Button theme="accent" onClick={handleAddFields}>Add More</Button> : ''}
                                    </div>

                                    <div className='formBtns text-right mt-4'>
                                        {details ? '' : < Button theme="accent float-left" onClick={() => checkValidationAndSubmit()}>Save</Button>}
                                        {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                                        {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit(true)}>Save + Add Interventions</Button>}
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

export default GoalFrom;
