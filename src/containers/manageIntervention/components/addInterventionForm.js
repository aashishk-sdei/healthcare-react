import React, { useState, useEffect, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, TextAreaBox, SelectBox } from '../../../components/common/FormsInput';

const InterventionFrom = ({ title, details, editable = false,dignosisSeleted,defaultProblem,parm, submitData, cancel, languageList, diagnosis, problemList, goalList, categoryList, programList, knowledgeList }) => {

    const diagnosisRef = createRef();
    const problemRef = createRef();
    const goalRef = createRef();
    const languageRef = createRef();

    const [language, setLanguage] = useState(details ? details['language'] : languageList && languageList.length > 0 ? languageList[languageList.findIndex(e => e.name === 'English')]['@rid'] : '');
    const [diagnos, setDiagnos] = useState(details ? details['diagnosis'] : dignosisSeleted)
    const [problem, setProblem] = useState(details ? details['problem'] : defaultProblem)
    const [goal, setGoal] = useState(details ? details['goal'] : parm)

    const [interventions, setInterventions] = useState(details ? [details] : [{ name: '', category: categoryList.length>0 && categoryList[categoryList.findIndex(e => e.name === 'Assist')]['@rid'], additional_info: '', knowledge_bank: '', pep: '', status: 1 }]);

    const [flag, setFlag] = useState(false);

    let filterProblemList = problemList.filter(e => e.diagnosis === diagnos || e.id === 0);
    let filterGoalList = goalList.filter(e => e.problem === problem || e.id === 0);

    useEffect(() => {
        interventions.map((item, idx) => item.status = item.status === 2 ? false : 1)
        setInterventions(interventions);
    }, []);

    const _handleKeypress = () => checkValidation();

    const checkValidation = async () => {
        await formValidation(interventions);
    }

    const checkValidationAndSubmit = async (point = false) => {
        diagnosisRef.current.props.onChange(diagnos);
        problemRef.current.props.onChange(problem);
        goalRef.current.props.onChange(goal);
        languageRef.current.props.onChange(language);

       let checkFormValid =  await formValidation(interventions);
        if (checkFormValid || diagnos === '' || problem === '' || goal === '' || language === '') console.log("Values should not be empty");
        else {
            interventions.map(item=>item.status === false?2:1);
            let payload = { point: point, diagnosis: diagnos, problem: problem, goal: goal, language: language, interventions: JSON.stringify(interventions) };

            if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
            submitData(payload);
        };
    }

    const handleAddFields = () => {
        setInterventions([...interventions, { name: '', category: categoryList.length>0 &&  categoryList[categoryList.findIndex(e => e.name === 'Assist')]['@rid'], additional_info: '', knowledge_bank: '', pep: '', status: 1 }]);
    };
    // handle click event of the Remove button
    const handleRemoveFields = index => {
        let list = [...interventions];
        list.splice(index, 1);
        setInterventions(list);
    };

    const formValidation = async (data, fieldname, index) => {
        let f = false;
        await data.map(async (x, i) => {
            if (fieldname && fieldname === 'category' && index === i) {
                x.pep = '';
                x.additional_info = '';
                x.knowledge_bank = '';
            }
            if (!x.name.replace(/\s+/g, ' ').trim()|| !x.category.replace(/\s+/g, ' ').trim()) {
                f = true;
            }
            if (x.category.replace(/\s+/g, ' ').trim() !== '') {
                if ( !x.name.replace(/\s+/g, ' ').trim() || categoryList.length>0 && x.category === categoryList[categoryList.findIndex(e => e.name === 'Assist')]['@rid'] && x.pep.replace(/\s+/g, ' ').trim() === '') {
                    f = true;
                }
                if (!x.name.replace(/\s+/g, ' ').trim() || categoryList.length>0 && x.category === categoryList[categoryList.findIndex(e => e.name === 'Co-ordinate')]['@rid'] && x.additional_info.replace(/\s+/g, ' ').trim() === '') {
                    f = true;
                }
                if (!x.name.replace(/\s+/g, ' ').trim() || categoryList.length>0 && x.category === categoryList[categoryList.findIndex(e => e.name === 'Educate')]['@rid'] && x.knowledge_bank.replace(/\s+/g, ' ').trim() === '') {
                    f = true;
                }
            }
            await setFlag(f);
        });
        return f;
    }

    const onChangeVal = async (fieldname, index, value) => {
        let shortField = [...interventions];
        shortField[index][fieldname] = value;
        await formValidation(shortField, fieldname, index);
        setInterventions([...shortField]);
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
                                            <SelectBox Name="Diagnosis" Placeholder="Select Diagnosis" val={diagnos} options={diagnosis} handleVal={(val) => {setDiagnos(val);setProblem('')}} edit={editable} ref={diagnosisRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Problem" Placeholder="Select Problem" val={problem} options={filterProblemList} handleVal={(val) => {setProblem(val);setGoal('')}} edit={editable} ref={problemRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Goals" Placeholder="Select Goal" val={goal} options={filterGoalList} handleVal={(val) => setGoal(val)} edit={editable} ref={goalRef} />
                                        </Col>
                                        
                                    </Row>
                                    {interventions.map((item, idx) => {
                                        return (
                                            <Row key={idx} form className="dynamicFiledSection interventions-row mt-30">
                                                <Col md="12" className="form-group text-right problem-action-outer">
                                                    <div className="problem-action-btn">{!item['@rid'] && interventions.length !== 1 && < Button theme="accent" className="removeicon" onClick={() => handleRemoveFields(idx)}><i className="material-icons">clear</i></Button>}</div>
                                                </Col>
                                                <Col md="6" className="form-group">
                                                    <TextBox Name="Intervention" Placeholder="Intervention" min={1} value={item.name} handleVal={(val) => onChangeVal('name', idx, val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} dynamic={true} />
                                                    {flag && item.name.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                </Col>
                                                {/* Select */}
                                                <Col md="6" className="form-group">
                                                    <SelectBox Name="Category" Placeholder="Select Category" val={item.category} options={categoryList} handleVal={(val) => onChangeVal('category', idx, val)} edit={editable} dynamic={true} />
                                                    {flag && item.category.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                </Col>
                                                {categoryList.length>0 && item.category === categoryList[categoryList.findIndex(e => e.name === 'Assist')]['@rid'] ?
                                                    <Col md="6" className="form-group">
                                                        <SelectBox Name="Program" Placeholder="Select Program" val={item.pep} options={programList} handleVal={(val) => onChangeVal('pep', idx, val)} edit={editable} dynamic={true} />
                                                        {flag && item.pep === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                    </Col>
                                                    : categoryList.length>0 && item.category === categoryList[categoryList.findIndex(e => e.name === 'Co-ordinate')]['@rid'] ?
                                                        <Col md="12" className="form-group">
                                                            <TextAreaBox Name="Additional Info" Placeholder="Additional Info" min={1} value={item.additional_info} handleVal={(val) => onChangeVal('additional_info', idx, val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} dynamic={true} />
                                                            {flag && item.additional_info.replace(/\s+/g, ' ').trim() === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                        </Col>
                                                        : categoryList.length>0 && item.category === categoryList[categoryList.findIndex(e => e.name === 'Educate')]['@rid'] ?
                                                            <Col md="6" className="form-group">
                                                                <SelectBox Name="Knowledge Bank" Placeholder="Select Knowledge Bank" val={item.knowledge_bank} options={knowledgeList} handleVal={(val) => onChangeVal('knowledge_bank', idx, val)} edit={editable} dynamic={true} />
                                                                {flag && item.knowledge_bank === '' ? <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div> : ''}
                                                            </Col>
                                                            : null
                                                }
                                                {/* Status */}
                                                <Col md="6" className="form-group">
                                                    <CheckBox Name="Status" className="withInput" value={item.status} handleVal={() => onChangeVal('status', idx, !item.status)} edit={editable ? true : false} />
                                                </Col>
                                            </Row>
                                        )
                                    })}

                                    <div className='formBtns text-right'>
                                        {editable ? <Button theme="accent" onClick={handleAddFields}>Add More</Button> : ''}
                                    </div>

                                    <div className='formBtns text-right mt-4'>
                                        {details ? '' : < Button theme="accent float-left" onClick={() => checkValidationAndSubmit()}>Save</Button>}
                                        {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                                        {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit(true)}>Save + Close</Button>}
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

export default InterventionFrom;
