import React, { useState, createRef, useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TitleTextBox, TextBox, EmailBox, CountryCodeBox } from '../common/FormsInput';
import PhoneInput from 'react-phone-number-input'
import { checkValidations } from '../../utils/checkValidations';


import './clientDetails.scss';

const ClientDetails = ({ title, flag, submitData, edit = true, details, cancel }) => {

  const nameRef = createRef(); const emailRef = createRef(); const phoneRef = createRef(); const positionRef = createRef();
  const [contactTitle, setTitle] = useState(details ? details['title'] : 'Mr');
  const [fullName, setFullName] = useState(details ? details['fullname'] : '');
  const [email, setEmail] = useState(details ? details['email'] : '');
  const [phone, setPhone] = useState(details ? details['phone'] : '');
  const [position, setPosition] = useState(details ? details['position'] : '');

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
    if (val < 12) {
      setCustClass('PhoneInputError');
    } else {
      setCustClass('active');
    }
  }

  const _handleKeypress = (e) => { submitForm() }

  const submitForm = () => {
    nameRef.current.props.onChange(fullName);
    emailRef.current.props.onChange(email);
    // phoneRef.current.props.onChange(phone);
    positionRef.current.props.onChange(position);

    setFocus(true);

    if (fullName === '' || email === '' || phone === '' || phone.length < 12 || position === '') console.log("Values should not be empty");
    else if (fullName.length < 1 || position.length < 1) console.log("Fields should be gtreater then 1");
    else if (!checkValidations('email', email)) console.log('Email address is not valid.');
    else {
      let payload = { title: contactTitle, fullname: fullName, email: email, phone: phone, position: position };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }
  return (
    <>
      <Card small className="mb-4 pt-3" >
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
                      <TitleTextBox Name="Full Name" Placeholder="Enter Full Name" min={1} titleVal={details ? details['title'] : contactTitle} handleTitle={(val) => setTitle(val)} value={details ? details['fullname'] : ''} handleVal={(val) => setFullName(val.replace(/\s+/g, ' ').trim())} edit={flag} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>

                  <Row form>
                    {/* Email */}
                    <Col md="12" className="form-group">
                      <EmailBox Name="Email" Placeholder="Enter Email" min={1} value={details ? details['email'] : ''} handleVal={(val) => setEmail(val.replace(/\s+/g, ' ').trim())} edit={flag} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Position */}
                    <Col md="12" className="form-group">
                      <TextBox Name="Position" Placeholder="Enter Position" min={1} value={details ? details['position'] : ''} handleVal={(val) => setPosition(val.replace(/\s+/g, ' ').trim())} edit={flag} ref={positionRef} handleKeypress={(e) => _handleKeypress(e)} />
                      {/* <TextBox Name="Position" Placeholder="Enter Position" value={details ? details['position'] : ''} handleVal={(val) => setPosition(val)} edit={flag} ref={positionRef} /> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="name">Phone</label>
                      <span style={{ 'color': '#ff0000' }}>  *</span>
                      <PhoneInput
                        className={custClass}
                        placeholder='Enter Phone Number'
                        defaultCountry="US"
                        value={details ? details['phone'] : ''}
                        disabled={!flag}
                        maxLength={20}
                        onFocus={() => handleOnFocus()}
                        onBlur={() => handleOnBlur()}
                        onChange={(val) => { val ? handleOnChange(val) : handleOnChange('') }}
                      />
                      {isFocus ? (phone.length < 12 ? <span className="phoneInputRequired">This field is required.</span> : '') : ''}
                      {/* <CountryCodeBox Name="Phone" Placeholder="Enter Phone Number" value={details ? details['groupContactPhone'] : ''} handleVal={(val) => setPhone(val)} edit={flag} ref={phoneRef} /> */}
                      {/* <TextBox Name="Phone" Placeholder="Enter Phone Number" value={details ? details['groupContactPhone'] : ''} handleVal={(val) => setPhone(val)} edit={flag} ref={phoneRef} /> */}
                    </Col>
                  </Row>


                  {/* {flag && < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button>} */}
                  {/* {flag && (details ?
                    edit ? <Button theme="accent" onClick={() => submitForm()}>Update</Button> : "" :
                    <Button theme="accent" onClick={() => submitForm()}>Submit</Button>)
                  } */}
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

export default ClientDetails;
