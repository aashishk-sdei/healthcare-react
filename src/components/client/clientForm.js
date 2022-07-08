import React, { useState, createRef, useEffect } from "react";

import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, SelectBox, NumberBox, EmailBox } from '../common/FormsInput';
import PhoneInput from 'react-phone-number-input'
import csc from 'country-state-city'
import { checkValidations } from '../../utils/checkValidations';

const ClientForm = ({ title, flag, details, editable = false, isNext, makeEditale, cancel }) => {

  const clientnameRef = createRef(); const clientemailRef = createRef(); const address1Ref = createRef(); const address2Ref = createRef(); const countryRef = createRef(); const cityRef = createRef(); const stateRef = createRef(); const zipcodeRef = createRef();

  const [clientName, setClientName] = useState(details ? details['contactName'] : '');
  const [clientEmail, setClientEmail] = useState(details ? details['contactEmail'] : '');
  const [contactPhone, setContactPhone] = useState(details ? details['contactPhone'] : '');
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
      if (!contactPhone || !contactPhone.length) {
        setCustClass('PhoneInputError');
      }
    }
  }

  const handleOnBlur = () => {
    if (editable) {
      setCustClass('');
    }
    if (!contactPhone || !contactPhone.length) {
      setCustClass('PhoneInputError');
    }
  }

  const handleOnChange = (val) => {
    setContactPhone(val);
    if (val < 12) {
      setCustClass('PhoneInputError');
    } else {
      setCustClass('active');
    }
  }


  const _handleKeypress = (e) => { checkValidationsisNext() }

  const checkValidationsisNext = () => {
    clientnameRef.current.props.onChange(clientName);
    clientemailRef.current.props.onChange(clientEmail);
    address1Ref.current.props.onChange(addressLine1);
    countryRef.current.props.onChange(country);
    stateRef.current.props.onChange(state);
    cityRef.current.props.onChange(city);
    zipcodeRef.current.props.onChange(zipcode);

    setFocus(true);
    if (clientName === '' || clientEmail === '' || addressLine1 === '' || city === '' || state === '' || country === '' || zipcode === '') console.log("Values should not be empty");
    else if (contactPhone && (contactPhone.length < 12 || contactPhone.length === 0)) { setCustClass('PhoneInputError'); console.log("Phone is requioed herre"); }
    else if (clientName.length < 1 || addressLine1.length < 1 || country.length < 1 || city.length < 1 || state.length < 1 || zipcode.length < 1) console.log("Fields be gtreater then 4", clientName, city, state);
    else if (!/^[0-9]*$/.test(zipcode)) console.log('Zip Code should be number only');
    else if (!checkValidations('email', clientEmail)) console.log('Email address is not valid.');
    else {
      let payload = { clientName: clientName, clientEmail: clientEmail, contactPhone: contactPhone, addressLine1: addressLine1, addressLine2: addressLine2, country: country, city: city, state: state, zipcode: zipcode };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      console.log("payload", payload)
      isNext(payload);
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
                    <TextBox Name="Client Name" Placeholder="Enter Client Name" min={1} value={details ? details['contactName'] : ''} handleVal={(val) => setClientName(val)} edit={flag} ref={clientnameRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <EmailBox Name="Client Email" Placeholder="Enter Client Email" min={1} value={details ? details['contactEmail'] : ''} handleVal={(val) => setClientEmail(val)} edit={flag} ref={clientemailRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <TextBox Name="Addresss Line 1" Placeholder="Enter Addresss Line 1" min={1} value={details ? details['addressLine1'] : ''} handleVal={(val) => setAddress1(val)} edit={flag} ref={address1Ref} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  <Col md="6" className="form-group">
                    <TextBox Name="Addresss Line 2" Placeholder="Enter Addresss Line 2" isRequired={false} value={details ? details['addressLine2'] : ''} handleVal={(val) => setAddress2(val)} edit={flag} ref={address2Ref} handleKeypress={(e) => _handleKeypress(e)} />
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
                    <NumberBox Name="Zip Code" Placeholder="Enter Zip Code" min={1} value={details ? details['zipcode'] : ''} handleVal={(val) => setZipcode(val)} edit={flag} ref={zipcodeRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="name">Phone</label><span style={{ 'color': '#ff0000' }}>  *</span>
                    <PhoneInput
                      className={custClass}
                      placeholder='Enter Phone Number'
                      defaultCountry="US"
                      value={details ? details['contactPhone'] : ''}
                      disabled={!flag}
                      maxLength={20}
                      onFocus={() => handleOnFocus()}
                      onBlur={() => handleOnBlur()}
                      onChange={(val) => { val ? handleOnChange(val) : handleOnChange('') }}
                    />
                    {isFocus ? ((contactPhone.length < 12 || contactPhone.length === 0) ? <span className="phoneInputRequired">This field is required.</span> : '') : ''}
                    {/* <CountryCodeBox Name="Phone" Placeholder="Enter Phone Number" value={details ? details['contactPhone'] : ''} handleVal={(val) => setGroupPhone(val)} edit={flag} ref={grouphoneRef} /> */}
                    {/* <TextBox Name="Phone Number" Placeholder="Enter Phone Number" value={details ? details['contactPhone'] : ''} handleVal={(val) => setGroupPhone(val)} edit={flag} ref={grouphoneRef} /> */}
                  </Col>
                </Row>
                <div className='formBtns text-right'>
                  {flag && (details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>)}
                  {flag ? (details ? (editable ? < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button> : '') : < Button theme="accent" onClick={() => checkValidationsisNext()}>Next</Button>) : ((details && !editable) ? '' : < Button theme="accent" onClick={() => makeEditale()}>Edit</Button>)}
                </div>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card >
  );
}

ClientForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

ClientForm.defaultProps = {
  title: "Account Details"
};

export default ClientForm;
