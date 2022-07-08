import React, { useState, createRef } from "react";
import { Button, Col, Row, Form } from 'reactstrap';
import { TextBox, EmailBox, CheckBox, TextAreaBox, SelectBox } from '../../FormsInput';
// import "./Questionnaires.scss";

const MassEmailModal = ({ type, template, submit, cancel }) => {
    const emailsRef = createRef();
    const [emails, setEmails] = useState('')

    const checkValidationAndSubmit = () => {
        emailsRef.current.props.onChange(emails);
        if (emails === '') console.log("Values should not be empty");
        else
            submit({ emails: emails, template: template });
            setEmails('');
    }

    return (
        <>
            <div className="header-dv">
                <div className="modal-body">
                    <Row>
                        <Col>
                            <Form>
                                <Row form>
                                    {/* TextArea */}
                                    {type === 'Mass Email' ?
                                        < Col md="12" className="form-group">
                                            <TextAreaBox Name="Email Ids" Placeholder="Mass Email" min={1} value={emails} handleVal={(val) => setEmails(val)} ref={emailsRef} />
                                            <div className="invalid-feedback" style={{ 'display': 'block' }}>Note:Multiple address can be added (test@test.com;test1.test.com). Please enter register emails only</div>
                                        </Col>
                                        :
                                        < Col md="12" className="form-group">
                                            <EmailBox Name="Email" Placeholder="service@healthiex.com" min={1} value={emails} handleVal={(val) => setEmails(val)} ref={emailsRef} />
                                        </Col>
                                    }
                                    {/* TextArea */}
                                    {/* <Col md="12" className="form-group">
                                        <TextAreaBox Name="Mass SMS" Placeholder="Mass SMS" min={1} />
                                    </Col>
                                    <div className="invalid-feedback" style={{ 'display': 'block' }}>Note: Please enter registered mobile numbers only</div> */}
                                </Row>
                                <div className="formBtns text-right">
                                    <Button theme="white" onClick={() => cancel()} className="btn-white">Close</Button>
                                    <Button theme="accent" onClick={() => checkValidationAndSubmit()} className="btn-accent">Send</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default MassEmailModal;