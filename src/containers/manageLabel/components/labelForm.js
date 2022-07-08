import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox, ColourPickerBox } from '../../../components/common/FormsInput';

const LabelForm = ({ title, details, editable = false, languages, submitData, cancel ,types}) => {

    const nameRef = createRef();
    const languageRef = createRef();
    const keyStringRef = createRef();
    const typeRef = createRef();

    const [name, setName] = useState(details ? details['title'] : '');
    const [keyString, setKeyString] = useState(details ? details['keyString'] : '');
    const [type, setType] = useState(details ? details['type'] : '');
    const [language, setLanguage] = useState(details ? details['language'] : languages && languages.length > 0 ? languages[languages.findIndex(e => e.name === 'English')]['@rid'] : '');
    const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

    const checkValidationAndSubmit = () => {
        nameRef.current.props.onChange(name);
        keyStringRef.current.props.onChange(keyString);
        typeRef.current.props.onChange(type);
        languageRef.current.props.onChange(language);
        if (name === '' || keyString === '' || type === '' || language === '') console.log("Values should not be empty");
        else {
            let payload = { title: name, type: type, language: language, keyString: keyString, status: status ? 1 : 2 };
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
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Language" Placeholder="Language" val={language} options={languages} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                                        </Col>
                                        {/* name */}
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Title" Placeholder="Title" min={1} value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={nameRef} />
                                        </Col>
                                        {/* label type */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Type" Placeholder="Type" val={type} options={types} optVal="key" handleVal={(val) => setType(val)} edit={editable} ref={typeRef} />
                                        </Col>
                                        {/* language short code */}
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Key String" Placeholder="Key String" min={1} value={keyString} handleVal={(val) => setKeyString(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={keyStringRef} />
                                        </Col>
                                        {/* Status */}
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

export default LabelForm;
