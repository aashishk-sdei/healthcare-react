import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { Collapse } from "reactstrap";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
const DiagnosisView = ({ title, details, cancel, diagnosisDetails }) => {
    const [tabToggle, settabToggle] = useState(null);
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const toggle = (index) => {
        if (tabToggle === index) {
            settabToggle(null);
        } else if (tabToggle !== index) {
            settabToggle(index);
        }
    };

    const decodeDesc = (description) => EditorState.createWithContent(ContentState.createFromBlockArray(description ? htmlToDraft(description.split('"').join("")).contentBlocks : htmlToDraft("--"))).getCurrentContent().getPlainText()
    return (
        <>
            <Card small className="mb-4" >
                <ListGroup flush>
                    <ListGroupItem className="p-3 diagnose-collapse">
                        <Row>
                            <Col>
                                <Row >

                                    <Col md="3" className="form-group">
                                        <label htmlFor="feEmail">Diagnosis Name :</label>
                                    </Col>
                                    <Col md="9" className="form-group">
                                        <span className="text-left">{details && capitalize(details.name)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feEmail">Diagnosis Description :</label>
                                    </Col>
                                    <Col md="9" className="form-group">
                                        <span>{details && decodeDesc(details.description)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feEmail">Diagnosis Status :</label>
                                    </Col>
                                    <Col md="9" className="form-group">
                                        <span>{details && details.status === 1 ? 'Active' : 'Inactive'}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" className="form-group">
                                        <div className="dragDropBlock">
                                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                    <div onClick={() => toggle(1)} className="dragListItem d-flex" style={{ background: '#2889f1', padding: "10px" }}>
                                                        <label className="flex-fill mb-0 pointer-div"> ICD Code</label>
                                                        <span className={`ml-auto d-inline-flex align-items-center justify-content-center  ${tabToggle === 4 ? "active" : ""}`} >
                                                            <i className="material-icons"> navigate_next</i>
                                                        </span>
                                                    </div>
                                                    <Collapse isOpen={tabToggle === 1} >
                                                        <div className="answerBlc overflow-auto">
                                                        {details && details.icd_code && details.icd_code.split(",").map((val, i) =><div className="p-3 m-1 collapse-inline">{val}{(details.icd_code.split(",").length - 1) !== i && ','}</div>)}
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col md="12" className="form-group">
                                        <div className="dragDropBlock">
                                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                    <div onClick={() => toggle(1)} className="dragListItem d-flex" style={{ background: '#2889f1', padding: "10px" }}>
                                                        <label className="flex-fill mb-0"> ICD Code</label>
                                                        <span className={`ml-auto d-inline-flex align-items-center justify-content-center  ${tabToggle === 1 ? "active" : ""}`} >
                                                            <i className="material-icons"> navigate_next</i>
                                                        </span>
                                                    </div>
                                                    <Collapse isOpen={tabToggle === 1} >
                                                        <div className="answerBlc overflow-auto">
                                                        {details && details.icd_code && details.icd_code.split(",").map((val, i) =><span>{val}{(details.icd_code.split(",").length - 1) !== i && ','}</span>)}
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col md="12" className="form-group">
                                        <div className="dragDropBlock">
                                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                    <div onClick={() => toggle(2)} className="dragListItem d-flex" style={{ background: '#2889f1', padding: "10px" }}>
                                                        <label className="flex-fill mb-0"> Problem</label>
                                                        <span className={`ml-auto d-inline-flex align-items-center justify-content-center  ${tabToggle === 2 ? "active" : ""}`} >
                                                            <i className="material-icons"> navigate_next</i>
                                                        </span>
                                                    </div>
                                                    <Collapse isOpen={tabToggle === 2} >
                                                        <div className="answerBlc overflow-auto">
                                                            {diagnosisDetails && diagnosisDetails.problems && diagnosisDetails.problems.length > 0 && diagnosisDetails.problems.map((val, i) => <div className="p-3 m-1 collapse-inline">{val.name}{(diagnosisDetails.problems.length - 1) !== i && ','}</div>)}
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" className="form-group">
                                        <div className="dragDropBlock">
                                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                    <div onClick={() => toggle(3)} className="dragListItem d-flex" style={{ background: '#2889f1', padding: "10px" }}>
                                                        <label className="flex-fill mb-0">Goals</label>
                                                        <span className={`ml-auto d-inline-flex align-items-center justify-content-center  ${tabToggle === 3 ? "active" : ""}`} >
                                                            <i className="material-icons"> navigate_next</i>
                                                        </span>
                                                    </div>
                                                    <Collapse isOpen={tabToggle === 3} >
                                                        <div className="answerBlc overflow-auto">
                                                            {diagnosisDetails && diagnosisDetails.goals && diagnosisDetails.goals.length > 0 && diagnosisDetails.goals.map((val, i) => <div className="m-1 collapse-inline">{val.name}{(diagnosisDetails.goals.length - 1) !== i && ','}</div>)}
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" className="form-group">
                                        <div className="dragDropBlock">
                                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                    <div onClick={() => toggle(4)} className="dragListItem d-flex" style={{ background: '#2889f1', padding: "10px" }}>
                                                        <label className="flex-fill mb-0"> Interventions</label>
                                                        <span className={`ml-auto d-inline-flex align-items-center justify-content-center  ${tabToggle === 4 ? "active" : ""}`} >
                                                            <i className="material-icons"> navigate_next</i>
                                                        </span>
                                                    </div>
                                                    <Collapse isOpen={tabToggle === 4} >
                                                        <div className="answerBlc overflow-auto">
                                                            {diagnosisDetails  && diagnosisDetails.interventions &&  diagnosisDetails.interventions.length > 0 && diagnosisDetails.interventions.map((val, i) => <div className="m-1 collapse-inline">{val.name}{(diagnosisDetails.interventions.length - 1) !== i && ','}</div>)}
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className='formBtns text-right'>
                                    <Button theme="white" onClick={() => cancel()}>close</Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card >
        </>
    );
}

export default DiagnosisView;
