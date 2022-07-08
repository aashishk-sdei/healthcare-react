import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, EmailBox, SelectBox } from '../../../components/common/FormsInput';
import { toast } from "react-toastify";
const EditCensusFrom = ({ title, details, editable = false, submitData, cancel }) => {

    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const emailRef = createRef();
    const mobileRef = createRef();
    const censusStatusRef = createRef();
    const genderArr = [{ id: 1, name: "Female" }, { id: 2, name: "Male" }];
    const [firstName, setFirstName] = useState(details ? details.firstname && details.firstname : '')
    const [lastName, setLastName] = useState(details ? details.lastname && details.lastname : '')
    const [email, setEmail] = useState(details ? details.emailaddress && details.emailaddress : '')
    const [gender, setGender] = useState(details ? details.gender && details.gender : '')
    const [mobile, setMobile] = useState(details ? details.mobile && details.mobile : '')
    const [ssn, setSsn] = useState(details ? details.ssn && details.ssn : '')
    const [state, setState] = useState(details ? details.state && details.state : '')
    const [city, setCity] = useState(details ? details.city && details.city : '')
    const [zip, setZip] = useState(details ? details.zip && details.zip : '')
    const [address1, setAddress1] = useState(details ? details.address1 && details.address1 : '')
    const [address2, setAddress2] = useState(details ? details.address2 && details.address2 : '')
    const [accesscode, setAccesscode] = useState(details ? details.accesscode && details.accesscode : '')
    const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
    const _handleKeypress = (e) => checkValidationAndSubmit();

    const checkValidationAndSubmit = () => {
        firstNameRef.current.props.onChange(firstName);
        if (firstName === '' || lastName === '' || gender === '' || email === '' || zip === '' || address1 === '' || accesscode === '') console.log("Values should not be empty");
        else {
            let payload = { firstname: firstName, lastname: lastName, email: email, address1: address1, address2: address2, mobile: mobile, ssn: ssn, gender: gender, state: state, city: city, zip: zip, accesscode: accesscode, status: status ? 1 : 2 };
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
                                            <TextBox Name="First Name" Placeholder="First name" min={1} value={firstName} handleVal={(val) => setFirstName(val)} edit={editable} ref={firstNameRef} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Last Name" Placeholder="Last name" min={1} value={lastName} handleVal={(val) => setLastName(val)} edit={editable} ref={lastNameRef} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <EmailBox Name="Email Address" Placeholder="Email Address" min={1} value={email} handleVal={(val) => setEmail(val)} edit={editable} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Mobile Number" Placeholder="Mobile Number" value={mobile} handleVal={(val) => setMobile(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="State" Placeholder="State" value={state} handleVal={(val) => setState(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="City" Placeholder="City" value={city} handleVal={(val) => setCity(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Address 1" Placeholder="Address 1" min={1} value={address1} handleVal={(val) => setAddress1(val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Address 2" Placeholder="Address 2" value={address2} handleVal={(val) => setAddress2(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="SSN" Placeholder="SSN" value={ssn} handleVal={(val) => setSsn(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Zip code" Placeholder="Zip code" value={zip} handleVal={(val) => setZip(val)} edit={editable} isRequired={false} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <TextBox Name="Access code" Placeholder="Access code" value={accesscode} min={1} handleVal={(val) => setAccesscode(val)} edit={editable} handleKeypress={(e) => _handleKeypress(e)} />
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Gender" Placeholder="Select Gender" val={gender} optVal='id' options={genderArr} handleVal={(val) => setGender(val)} isRequired={false} edit={editable} />
                                        </Col>
                                    </Row>
                                    {/* Status */}
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
                                        </Col>
                                        {/* <FormButtons className="text-right" /> */}
                                    </Row>
                                    <div className='formBtns text-right'>
                                        {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                                        {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Save</Button>}
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

export default EditCensusFrom;
