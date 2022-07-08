import React, { useState, createRef, useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, TitleTextBox, EmailBox, CountryCodeBox } from '../common/FormsInput';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './../common/FormsInput/CountryCodeBox.scss';
import './groupDetails.scss';

const GroupDetails = ({ title, flag, submitData, cancel, edit = true, details }) => {

  const nameRef = createRef(); const emailRef = createRef(); const phoneRef = createRef(); const positionRef = createRef();
  const [contactTitle, setTitle] = useState(details ? details['groupContactTitle'] : 'Mr');
  const [fullName, setFullName] = useState(details ? details['groupContactName'] : '');
  const [email, setEmail] = useState(details ? details['groupContactEmail'] : '');
  const [phone, setPhone] = useState(details ? details['groupContactPhone'] : '');
  const [position, setPosition] = useState(details ? details['groupContactPosition'] : '');


  // For mobile input
  const [custClass, setCustClass] = useState('');
  const [isFocus, setFocus] = useState(false);

  useEffect(() => {
    if (edit)
      setCustClass('PhoneInputDisable');
  }, []);

  const handleOnFocus = () => {
    setFocus(true);
    if (edit) {
      setCustClass('active');
      if (!phone || !phone.length) {
        setCustClass('PhoneInputError');
      }
    }
  }

  const handleOnBlur = () => {
    if (edit) {
      setCustClass('');
    }
    if (!phone || !phone.length) {
      setCustClass('PhoneInputError');
    }
  }

  const handleOnChange = (val) => {
    setPhone(val);
    if (val.length === 4) {
      setCustClass('PhoneInputError');
    } else {
      setCustClass('active');
    }
  }

  const _handleKeypress = (e) => { submitForm(); }

  const submitForm = () => {
    nameRef.current.props.onChange(fullName);
    emailRef.current.props.onChange(email);
    // phoneRef.current.props.onChange(phone);
    positionRef.current.props.onChange(position);
    setFocus(true);

    if (fullName === '' || email === '' || phone === '' || position === '' || position.replace(/\s+/g, ' ').trim().length === 0) console.log("Values should not be empty");
    else if (fullName.length < 1 || position.length < 1) console.log("Fields be gtreater then 1");
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email.length > 0) console.log("Email should be Correct : ", email);
    else if (phone.length <= 3 || phone.length === 0) { setCustClass('PhoneInputError'); console.log("Phone is requioed herre"); }
    else {
      let payload = { groupContactTitle: contactTitle, groupContactName: fullName, groupContactEmail: email, groupContactPhone: phone, groupContactPosition: position };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }
  return (
    <>
      <Card small className="mb-4" >
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-4">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* Name */}
                    <Col md="12" className="form-group">
                      <TitleTextBox Name="Full Name" Placeholder="Enter Full Name" titleVal={details ? details['groupContactTitle'] : contactTitle} min={1} handleTitle={(val) => setTitle(val)} value={details ? details['groupContactName'] : ''} handleVal={(val) => setFullName(val)} edit={flag} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="12" className="form-group">
                      <EmailBox Name="Email" Placeholder="Enter Email" value={details ? details['groupContactEmail'] : ''} handleVal={(val) => setEmail(val)} edit={flag} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Phone */}
                    <Col md="12" className="form-group">
                      <label htmlFor="name">Phone</label>
                      <span style={{ 'color': '#ff0000' }}>  *</span>
                      <PhoneInput
                        className={custClass}
                        placeholder='Enter Phone Number'
                        defaultCountry="US"
                        value={details ? details['groupPhone'] : ''}
                        disabled={!flag}
                        maxLength={20}
                        onFocus={() => handleOnFocus()}
                        onBlur={() => handleOnBlur()}
                        onChange={(val) => { val ? handleOnChange(val) : handleOnChange('') }}
                      />
                      {isFocus ? (phone.length <= 3 ? <span className="phoneInputRequired">This field is required.</span> : '') : ''}
                      {/* <CountryCodeBox Name="Phone" Placeholder="Enter Phone Number" value={details ? details['groupContactPhone'] : ''} handleVal={(val) => setPhone(val)} edit={flag} ref={phoneRef} /> */}
                      {/* <TextBox Name="Phone" Placeholder="Enter Phone Number" value={details ? details['groupContactPhone'] : ''} handleVal={(val) => setPhone(val)} edit={flag} ref={phoneRef} /> */}
                    </Col>
                  </Row>
                  <Row form>
                    {/* Position */}
                    <Col md="12" className="form-group">
                      <TextBox Name="Position" Placeholder="Enter Position" min={1} value={details ? details['groupContactPosition'] : ''} handleVal={(val) => setPosition(val)} edit={flag} ref={positionRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  {/* {flag && < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button>} */}
                  <div className='formBtns text-right'>
                    {flag && (details ? (edit ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>)}
                    {flag && (details ? (edit ? <Button theme="accent" onClick={() => submitForm()}>Update</Button> : '') : <Button theme="accent" onClick={() => submitForm()}>Submit</Button>)
                    }
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

export default GroupDetails;
