import React, { useState, createRef,useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, EmailBox, CheckBox, TextAreaBox, SelectBox } from '../../../components/common/FormsInput';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML, Modifier, SelectionState, AtomicBlockUtils } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
const ProblemFrom = ({ title, details, editable = false, submitData, cancel, diagnosis,parm, languageList }) => {
    const diagnosisRef = createRef();
    const languageRef = createRef();
    const [language, setLanguage] = useState(details ? details['language'] : languageList && languageList.length > 0 ? languageList[languageList.findIndex(e => e.name === 'English')]['@rid'] : '');
    let [problems, setProblems] = useState(details?[details]:[{ name: '', short_description: '', long_description: '', status: 1 }])
    const [diagnos, setDiagnos] = useState(details ? details['diagnosis'] :parm?parm:'');
    const [flag, setFlag]= useState(false);
    // const [editorState, setEditorState] = useState([EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("")))]);
    const [longDescriptions, setLongDescriptions] = useState([EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== "undefined") ? htmlToDraft(details.long_description.split('"').join("")).contentBlocks : htmlToDraft("")))]);
    const _handleKeypress = () => checkValidation();

    const checkValidation = async() => {
        problems.map(async(x,i)=> await  setFlag(x.name ===''||x.short_description===''?true:false));
    }
    useEffect(() => {
        problems.map((item, idx) =>   item.status = item.status === 2 ? false : 1);
        setProblems(problems);
    }, []);


    // setDiagnos(details ? details['diagnosis'] :parm?parm:'');
    const checkValidationAndSubmit = async(point = false) => {
        let invalid = false;
        let duplicate=false;
        languageRef.current.props.onChange(language);
        diagnosisRef.current.props.onChange(diagnos);
        problems.map(async(x,i)=>{  
            setFlag(x.name ===''||x.short_description===''?true:false);
             if(!x.name||!x.short_description)
             invalid=true;
             if(problems.filter(e=>e.name ===x.name).length >1)
             duplicate =true
            });
            if(duplicate)
             toast.warn('The problem "name" could not same');
        if (language === ''|| diagnos ==='' ||invalid  ) console.log("Values should not be empty");
        else {
             problems.map(item=>item.status === false?2:1);
            let payload = {language:language, diagnosis:diagnos, problems: JSON.stringify(problems),point:point };
            if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
            submitData(payload);
        };
    }

    const handleAddFields = () => {
        setProblems([...problems, { name: '', short_description: '', long_description: '', status: 1 }]);
    };

    const onChangeVal =(fieldname,index,value)=>{
        // debugger;
        let shortField = [...problems];
        shortField[index][fieldname] = typeof value !== "boolean"?value.replace(/\s+/g, ' ').trim():value;
        shortField.map(async(x,i)=>await  setFlag(x.name ===''||x.short_description===''?true:false));
        setProblems([...shortField]);
    }

    const longDescriptionChange = (editorStateval,index) => {
        let shortField = [...problems];
        let neweditstate = [...longDescriptions]
        shortField[index].long_description = JSON.stringify(draftToHtml(convertToRaw(editorStateval.getCurrentContent())));
        setProblems([...shortField])
        neweditstate[index]=editorStateval;
        setLongDescriptions([...neweditstate]);
      };

    // handle click event of the Remove button
    const handleRemoveFields = index => {
        const list = [...problems];
        list.splice(index, 1);
        setProblems(list);
    };
    return (
        <>
            <Card small className="mb-4" >
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
                                            <SelectBox Name="Diagnosis" Placeholder="Diagnosis" val={diagnos} options={diagnosis} handleVal={(val) => setDiagnos(val)} edit={editable} ref={diagnosisRef} />
                                        </Col>
                                    </Row>
                                    {problems.map((field, inx) => {
                                        return (
                                            <Row form className="dynamicFiledSection problem-row mt-30" key={inx}>
                                                  <Col md="12" className="form-group text-right problem-action-outer">
                                                        <div className="problem-action-btn">{!field['@rid'] && problems.length !== 1 && < Button theme="accent" className="removeicon" onClick={() => handleRemoveFields(inx)}><i className="material-icons">clear</i></Button>}</div>
                                                  </Col>
                                                <Col md="6" className="form-group">
                                                    <TextBox Name="Problem" Placeholder="Problem" min={1} value={field.name} handleVal={(val) => { onChangeVal('name',inx,val)}} edit={editable} dynamic={true} />
                                                  { flag && field.name ==='' && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                                                </Col>
                                                
                                                <Col md="12" className="form-group">
                                                    <TextAreaBox Name="Short Description" Placeholder="Short Description" min={1} value={field.short_description} handleVal={(val) => { onChangeVal('short_description',inx,val)}} edit={editable} dynamic={true}/>
                                                    { ( flag && field.short_description==='') && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                                                  
                                                </Col>
                                                <Col md="12" className="form-group">
                                                <label>Long Description</label>
                                                <Editor
                                                    editorState={longDescriptions[inx]}
                                                    onEditorStateChange={val=>longDescriptionChange(val,inx)}
                                                    readOnly={!editable ? true : false}
                                                />
                                                </Col>
                                                 {/* Status */}
                                                 <Col md="6" className="form-group">
                                                    <CheckBox Name="Status" className="withInput" value={field.status} handleVal={() =>  onChangeVal('status',inx,!field.status)} edit={editable ? true : false}  />
                                                </Col>
                                               
                                                        {/* {!field['@rid'] && problems.length !== 1 && < Button theme="accent" className="removeicon" onClick={() => handleRemoveFields(inx)}><i className="material-icons">clear</i></Button>} */}
                                                   
                                            </Row>

                                        )
                                    })}
                                    <div className='formBtns text-right'>
                                        {editable ? <Button theme="accent" onClick={handleAddFields}>Add More</Button> : ''}
                                    </div>
                                    <div className='formBtns text-right mt-30'>
                                        {details ? '' : < Button theme="accent float-left" onClick={() => checkValidationAndSubmit(true)}>Save</Button>}
                                        {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                                        {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Save + Add Goal</Button>}

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

export default ProblemFrom;
