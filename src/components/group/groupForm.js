import React, { useState, createRef, useEffect } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, NumberBox, EmailBox, SelectBox } from '../common/FormsInput';
import { GROUP_SAC_FIELDS } from './../../utils/constants';
import PhoneInput from 'react-phone-number-input'
import csc from 'country-state-city'
import 'react-phone-number-input/style.css'
import './../common/FormsInput/CountryCodeBox.scss';

const GroupForm = ({ title, flag, details, groupType, editable = false, isNext, makeEditale, cancel }) => {
  const groupnameRef = createRef(); const groupemailRef = createRef(); const groupTypeRef = createRef(); const address1Ref = createRef(); const address2Ref = createRef(); const countryRef = createRef(); const cityRef = createRef(); const stateRef = createRef(); const zipcodeRef = createRef();
  const [groupName, setGroupName] = useState(details ? details['groupName'] : '');
  const [groupEmail, setGroupEmail] = useState(details ? details['groupEmail'] : '');
  const [groupPhone, setGroupPhone] = useState(details ? details['groupPhone'] : '');
  const [groupTypeID, setGroupTypeID] = useState(details ? details['groupTypeID'] : '');
  const [addressLine1, setAddress1] = useState(details ? details['addressLine1'] : '');
  const [addressLine2, setAddress2] = useState(details ? details['addressLine2'] : '');
  const [country, setCountry] = useState(details ? details['country'] : '231');
  const [city, setCity] = useState(details ? details['city'] : '');
  const [state, setState] = useState(details ? details['state'] : '');
  const [zipcode, setZipcode] = useState(details ? details['zipcode'] : '');
  const [countries, setCountries] = useState(csc.getAllCountries());
  const [states, setStates] = useState(details ? csc.getStatesOfCountry(details['country']) : csc.getStatesOfCountry('231'));
  const [cities, setCities] = useState(details ? csc.getCitiesOfState(details['state']).length ? csc.getCitiesOfState(details['state']) : [csc.getStateById(details['state'])] : []);
  // For mobile input
  const [custClass, setCustClass] = useState('');
  const [isFocus, setFocus] = useState(false);
  useEffect(() => {
    if (!editable)
      setCustClass('PhoneInputDisable');
  }, []);

  const handleOnFocus = () => {
    setFocus(true);
    if (editable) {
      setCustClass('active');
      if (!groupPhone || !groupPhone.length) {
        setCustClass('PhoneInputError');
      }
    }
  }

  const handleOnBlur = () => {
    if (editable) {
      setCustClass('');
    }
    if (!groupPhone || !groupPhone.length) {
      setCustClass('PhoneInputError');
    }
  }

  const handleOnChange = (val) => {
    setGroupPhone(val);
    if (val < 5) {
      setCustClass('PhoneInputError');
    } else {
      setCustClass('active');
    }
  }

  const _handleKeypress = (e) => { checkValidationsisNext(); }

  const checkValidationsisNext = () => {
    groupnameRef.current.props.onChange(groupName);
    groupemailRef.current.props.onChange(groupEmail);
    groupTypeRef.current.props.onChange(groupTypeID);
    address1Ref.current.props.onChange(addressLine1);
    countryRef.current.props.onChange(country);
    stateRef.current.props.onChange(state);
    cityRef.current.props.onChange(city);
    zipcodeRef.current.props.onChange(zipcode);
    setFocus(true);
    if (groupName === '' || groupEmail === '' || groupTypeID === '' || groupTypeID === 'Select Group Type' || addressLine1 === '' || country === '' || city === '' || state === '' || zipcode === '' || addressLine1.replace(/\s+/g, ' ').trim().length === 0) console.log("Values should not be empty");
    else if (groupPhone.length < 1 || groupPhone.length === 0) { setCustClass('PhoneInputError'); console.log("Phone is requioed herre"); }
    else if (groupName.length < 1 || addressLine1.length < 1 || country.length < 1 || city.length < 1 || state.length < 1 || zipcode.length < 1) console.log("Fields be gtreater then 4");
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(groupEmail) && groupEmail.length > 0) console.log("Email should be Correct : ", groupEmail);
    else if (!/^[0-9]*$/.test(zipcode)) console.log('Zip Code should be number only');
    else {
      let payload = { groupName: groupName, groupEmail: groupEmail, groupPhone: groupPhone, groupTypeID: groupTypeID.replace('#', ''), addressLine1: addressLine1, addressLine2: addressLine2, country: country, city: city, state: state, zipcode: zipcode };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      isNext(payload);
      console.log("payload :", payload);
    };
  }

  const handleCountryChange = (val) => {
    setCountry(val);
    const stateArray = csc.getStatesOfCountry(val);
    setStates([...stateArray]); setCities([]); setCity('');
    setState('');

    // setState(stateArray[0]['id']); 
    // stateRef.current.props.onChange(stateArray[0]['id']);
    // cityRef.current.props.onChange('');
  }
  const handleStateChange = (val) => {
    if (val !== '') {
      setState(val);
      const cityArray = csc.getCitiesOfState(val);
      if (cityArray && cityArray.length) {
        setCities([...cityArray]);
        // setCity(cityArray[0]['id']);
        // cityRef.current.props.onChange(cityArray[0]['id']);
      }
      else {
        const tempState = csc.getStateById(val);
        setCities([tempState]);
        // setCity(tempState['id']);
        // cityRef.current.props.onChange(tempState['id']);
      }
      setCity('');
    }
  }

  return (
    < Card small className="mb-4" >
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* Name */}
                  <Col md="6" className="form-group">
                    <TextBox Name="Group Name" Placeholder="Enter Group Name" min={1} value={groupName} handleVal={(val) => setGroupName(val)} edit={flag} ref={groupnameRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <EmailBox Name="Group Email" Placeholder="Enter Group Email" min={1} value={details ? details['groupEmail'] : ''} handleVal={(val) => setGroupEmail(val)} edit={flag} ref={groupemailRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                </Row>
                <Row form>
                  {/* Phone */}
                  <Col md="6" className="form-group">
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
                    {isFocus ? ((groupPhone.length <= 3 || groupPhone.length === 0) ? <span className="phoneInputRequired">This field is required.</span> : '') : ''}
                  </Col>
                  {/* groupType */}
                  <Col md="6" className="form-group">
                    <SelectBox Name="Group Type" Placeholder="Select Group Type" val={details ? details['groupTypeID'] : ''} options={groupType} handleVal={(val) => setGroupTypeID(val)} edit={flag} ref={groupTypeRef} />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <TextBox Name="Addresss Line 1" Placeholder="Enter Addresss Line 1" min={1} value={details ? details['addressLine1'] : ''} handleVal={(val) => setAddress1(val)} edit={flag} ref={address1Ref} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  {/* addresss */}
                  <Col md="6" className="form-group">
                    <TextBox Name="Addresss Line 2" Placeholder="Enter Addresss Line 2" value={details ? details['addressLine2'] : ''} isRequired={false} handleVal={(val) => setAddress2(val)} edit={flag} ref={address2Ref} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <SelectBox Name="Country" Placeholder="Select Country" optVal={'id'} val={country} options={countries} handleVal={(val) => handleCountryChange(val)} edit={flag} ref={countryRef} />
                  </Col>
                  <Col md="6" className="form-group">
                    <SelectBox Name="State" Placeholder="Select State" optVal={'id'} val={state} options={states} handleVal={(val) => handleStateChange(val)} edit={flag} ref={stateRef} />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <SelectBox Name="City" Placeholder="Select City" optVal={'id'} val={city} options={cities} handleVal={(val) => setCity(val)} edit={flag} ref={cityRef} />
                  </Col>
                  <Col md="6" className="form-group">
                    <NumberBox Name="Zipcode" Placeholder="Enter Zipcode" min={1} value={details ? details['zipcode'] : ''} handleVal={(val) => setZipcode(val)} edit={flag} ref={zipcodeRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                </Row>
                {details && !editable && details.sac && details.sac.length ? <hr /> : ''}
                <Row>
                  {/* Zip Code */}
                  {details && !editable && details.sac && details.sac.map((item, index) => {
                    return (<Col key={index} md="6" className="form-group">
                      <TextBox Name={GROUP_SAC_FIELDS[item['roles_guid']]} Placeholder="Enter Zipcode" min={1} value={item['access_code']} edit={false} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>);
                  })}
                </Row>
                {/* <FormButtons className="text-right" /> */}
                <div className='formBtns text-right'>
                  {flag && (details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>)}
                  {flag ? (details ? (editable ? < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button> : '') : < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button>) : ((details && !editable) ? '' : < Button theme="accent" onClick={() => makeEditale()}>Edit</Button>)}
                </div>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default GroupForm;
