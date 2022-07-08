import React, { useState, createRef, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, FormCheckbox } from "shards-react";
import PhoneInput from 'react-phone-number-input'
import { Multiselect } from 'multiselect-react-dropdown';
import csc from 'country-state-city'
import { TextBox, NumberBox, CheckBox, SelectBox, EmailBox, PasswordBox } from '../../../../components/common/FormsInput';
import { list_permission } from '../../../../context/actions/staff';
import './tabBlock.scss';
import { checkValidations } from '../../../../utils/checkValidations';

const TabBlock = ({ flag, view, details, allassigned, Tab, staff, usertype, permission, editable = false, isNext, makeEditale, cancel, client, isSave, isSavePermission }) => {
  let viewArr = details ? details.viewArr : [];
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(Tab);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    setStaffID(details ? details['@rid'] : '');
  }
  const firstnameRef = createRef(); const middlenameRef = createRef(); const lastnameRef = createRef();
  const address1Ref = createRef(); const address2Ref = createRef(); const userRef = createRef(); const staffRef = createRef(); const stafRef = createRef();
  const countryRef = createRef(); const cityRef = createRef(); const stateRef = createRef(); const zipcodeRef = createRef(); const emailRef = createRef(); const passwordRef = createRef();
  const [firstname, setFirstname] = useState(details ? details['firstname'] : '');
  const [middlename, setMiddlename] = useState(details ? details['middlename'] : '');
  const [lastname, setLastname] = useState(details ? details['lastname'] : '');
  const [email, setEmail] = useState(details ? details['email'] : '');
  const [password, setPassword] = useState('');
  const [address1, setAddress1] = useState(details ? details['address1'] : '');
  const [address2, setAddress2] = useState(details ? details['address2'] : '');
  const [country, setCountry] = useState(details ? details['country'] : '231');
  const [city, setCity] = useState(details ? details['city'] : '');
  const [state, setState] = useState(details ? details['state'] : '');
  const [countries, setCountries] = useState(csc.getAllCountries());
  const [states, setStates] = useState(details ? csc.getStatesOfCountry(details['country']) : csc.getStatesOfCountry('231'));
  const [cities, setCities] = useState(details ? csc.getCitiesOfState(details['state']).length ? csc.getCitiesOfState(details['state']) : [csc.getStateById(details['state'])] : []);
  const [zipcode, setZipcode] = useState(details ? details['zipcode'] : '');
  const [phone, setPhone] = useState(details ? details['phone'] : '');
  const [emailFlag, setEmailFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const [err, setErr] = useState(false);
  const [errassign, setErrAssign] = useState([]);
  const [staffID, setStaffID] = useState(details ? details['@rid'] : '');
  const [stafID, setstafID] = useState(details ? details['@rid'] : '');
  const [userID, setuserID] = useState(details ? details['userType'] : '');
  const [option, setOption] = useState(view);
  const [selected, setSelected] = useState((details && details.assignedClient && details.assignedClient.length) ? details.assignedClient.map(ele => ele['clientId']) : []);
  let predelected = [];
  details && details.staff_permission && details.staff_permission.forEach(async (element) => {
    predelected.push({ [element.module]: { edit: element.edit, add: element.add, delete: element.delete, search: element.search, view: element.view } })
  });
  if (!details) {
    permission && permission.length && permission.forEach(async (element) => {
      predelected.push({ [element.module]: { edit: element.edit, add: element.add, delete: element.delete, search: element.search, view: element.view } })
    });
  }
  const [selectedPermission, setSelectedPermission] = useState(predelected.length > 0 ? predelected : []);

  const [selectedViews, setSelectedViews] = useState(viewArr ? viewArr : []);
  const [removedViews, setRemovedViews] = useState([]);

  const [status, setStatus] = useState(details ? (details['status'] == 1 ? true : false) : true)
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
      if (!phone || !phone.length) {
        setCustClass('PhoneInputError');
      }
    }
  }

  const handleOnBlur = () => {
    if (editable) {
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

  const _handleKeypress = (e) => { checkValidationsisNext() }

  const checkValidationsisNext = () => {
    let statusvalue = status == true ? 1 : 2
    selectedViews && selectedViews.length === 0 ? setErr(true) : setErr(false)
    firstnameRef.current.props.onChange(firstname);
    lastnameRef.current.props.onChange(lastname);
    emailRef.current.props.onChange(email);
    address1Ref.current.props.onChange(address1);
    countryRef.current.props.onChange(country);
    stateRef.current.props.onChange(state);
    cityRef.current.props.onChange(city);
    zipcodeRef.current.props.onChange(zipcode);
    userRef.current.props.onChange(userID);

    setFocus(true);
    if (details == undefined) { passwordRef.current.props.onChange(password) }


    if (firstname === '' || lastname === '', email === '' || address1 === '' || city === '' || state === '' || zipcode === '' || country === '' || userID === '' || userID === 'Select User Type' || selectedViews.length === 0) console.log("Values should not be empty", userID);
    else if (phone.length < 12 || phone.length === 0) { setCustClass('PhoneInputError'); console.log("Phone is requioed herre"); }
    else if (firstname.length < 1);
    else if (!/^[0-9]*$/.test(zipcode)) console.log('Zip Code should be number only.');
    else if (!checkValidations('email', email)) console.log('Email address is not valid.');
    else {
      let payload = { firstname: firstname, middlename: middlename, lastname: lastname, email: email.toLowerCase(), password: password, phone: phone, address1: address1, address2: address2, city: city, state: state, zipcode: zipcode, country: country, userType: userID, view: selectedViews, status: statusvalue };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      isNext(payload);
    };
  }

  const onSelect = (selectedList, selectedItem) => {
    selectedViews.push({ viewId: selectedItem['@rid'] });
    setSelectedViews(selectedViews);

    selectedViews && selectedViews.length === 0 ? setErr(true) : setErr(false)

  }
  const onRemove = (selectedList, removedItem) => {
    let indx = selectedViews.findIndex(e => e['@rid'] == removedItem['@rid']);
    selectedViews.splice(indx, 1);
    setSelectedViews(selectedViews);
    removedViews.push(removedItem['@rid']);
    setRemovedViews(removedViews);
    selectedViews && selectedViews.length === 0 ? setErr(true) : setErr(false)

  }
  const handleCheck = async (id, event) => {
    if (staffID && staffID != '') {
      let Offerdata = (allassigned && allassigned.length) ? allassigned.filter(element => {
        let el = JSON.parse(JSON.stringify(element))
        return el['clientId'] === id && el['staffId'] != staffID
      }) : '';
      if (Offerdata && Offerdata != '' && !event) {
        errassign.push(Offerdata[0]['clientId'])
        setErrAssign(errassign)
      }
      else {
        let assg = errassign.findIndex(element => element === id);
        errassign.splice(assg, 1)
        setErrAssign(errassign)
      }
      // else {
      const elementsIndex = client.findIndex(element => element['@rid'] === id);
      client[elementsIndex] = { ...client[elementsIndex], isChecked: !client[elementsIndex].isChecked };
      let select = [...selected];
      if (select && select.length) {
        const index = select.findIndex(rid => rid === id);
        if (index === -1) select.push(id);
        else select.splice(index, 1);
      } else select.push(id);
      //   select.push(id);
      setSelected(select);
    }
    else {
      staffRef.current.props.onChange(staffID);
    }
  }

  const saveData = () => {
    if (selected.length == 0 || staffID === '' || staffID === 'Select Staff Member') {
      console.log("err is there");
    } else {
      console.log("else")
      let payload = { staffId: staffID, clientId: selected };
      isSave(payload);
      if (details == undefined) {
        setErrAssign([]);
      }
    }
  }

  const checBoxHandler = async (element, name) => {
    let id = element.module;
    if (selectedPermission && selectedPermission.length > 0) {
      let index = selectedPermission.findIndex(e => e[id]);
      if (index == -1) setSelectedPermission([...selectedPermission, { [id]: { [name]: true } }])
      else if (selectedPermission[index][id][name]) {
        selectedPermission[index][id][name] = false;
        setSelectedPermission([...selectedPermission]);
      } else {
        selectedPermission[index][id][name] = true
        setSelectedPermission([...selectedPermission]);
      }
    } else setSelectedPermission([...selectedPermission, { [id]: { [name]: true } }]);

  }

  const isChecked = (id, name) => {
    if (selectedPermission.length > 0) {
      let index = selectedPermission.findIndex(e => e[id]);
      return index != -1 ? selectedPermission[index][id][name] ? true : false : false
    } return false;

  }

  const savePermission = () => {
    if (selectedPermission.length <= 0 || stafID === '') console.log("err is there");
    else {
      let payload = { staffId: stafID, permissionList: selectedPermission };
      if (!details) {
        setstafID('');
      }
      isSavePermission(payload, details);
    }
  }

  const onChangeStaff = (val) => {
    setstafID(val)
    dispatch(list_permission({ staffId: val }, (result) => {
      let predelected = [];
      result && result.data && result.data.length && result.data.forEach(async (element) => {
        predelected.push({ [element.module]: { edit: element.edit, add: element.add, delete: element.delete, search: element.search, view: element.view } })
      });
      setSelectedPermission(predelected);
    }));
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
    <>
      <div className="tabWrapper">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >Basic Information</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >Permission</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >Assign Client</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>

          <TabPane tabId="1">
            <Row className="manage-staff1">
              <Col md="6" className="form-group">
                <TextBox Name="First Name" Placeholder="First Name" min={1}
                  value={details ?
                    details['firstname'] : ''} handleVal={(val) => setFirstname(val)} edit={flag}
                  ref={firstnameRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Middle Name" isRequired={false} Placeholder=" Middle Name" min={1}
                  value={details ?
                    details['middlename'] : ''} handleVal={(val) => setMiddlename(val)} edit={flag}
                  ref={middlenameRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Last Name" Placeholder="Last Name" min={1}
                  value={details ?
                    details['lastname'] : ''} handleVal={(val) => setLastname(val)} edit={flag}
                  ref={lastnameRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Address 1" Placeholder="Address 1" min={1}
                  value={details ?
                    details['address1'] : ''} handleVal={(val) => setAddress1(val)} edit={flag}
                  ref={address1Ref} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <TextBox Name="Address 2" Placeholder="Address 2" min={1} isRequired={false}
                  value={details ?
                    details['address2'] : ''} handleVal={(val) => setAddress2(val)} edit={flag}
                  ref={address2Ref} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
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
                {isFocus ? ((phone.length < 12 || phone.length === 0) ? <span className="phoneInputRequired">This field is required.</span> : '') : ''}
              </Col>
              <Col md="6" className="form-group">
                <SelectBox Name="Country" Placeholder="Select Country" optVal={'id'} val={country} options={countries} handleVal={(val) => handleCountryChange(val)} edit={flag} ref={countryRef} />
              </Col>
              <Col md="6" className="form-group">
                <SelectBox Name="State" Placeholder="Select State" optVal={'id'} val={state} options={states} handleVal={(val) => handleStateChange(val)} edit={flag} ref={stateRef} />
              </Col>
              <Col md="6" className="form-group">
                <SelectBox Name="City" Placeholder="Select City" optVal={'id'} val={city} options={cities} handleVal={(val) => setCity(val)} edit={flag} ref={cityRef} />
              </Col>
              <Col md="6" className="form-group">
                <NumberBox Name="ZipCode " Placeholder="ZipCode " min={1}
                  value={details ?
                    details['zipcode'] : ''} handleVal={(val) => setZipcode(val)} edit={flag}
                  ref={zipcodeRef} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <EmailBox Name="Email" Placeholder="Email " min={1} edit={flag && !stafID ? true : (flag && stafID && emailFlag) ? true : false}
                  value={details ?
                    details['email'] : ''} handleVal={(val) => setEmail(val)} ref={emailRef} isIcon={stafID ? true : false} isLocked={() => setEmailFlag(emailFlag ? false : true)} icon={emailFlag} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <PasswordBox Name="Password" Placeholder="Password " min={1} edit={flag && !stafID ? true : (flag && stafID && passFlag) ? true : false}
                  value={password} handleVal={(val) => setPassword(val)} ref={passwordRef} isRequired={!stafID ? true : false} isIcon={stafID ? true : false} isLocked={() => setPassFlag(passFlag ? false : true)} icon={passFlag} handleKeypress={(e) => _handleKeypress(e)} />
              </Col>
              <Col md="6" className="form-group">
                <SelectBox Name="User Type" Placeholder="Select User Type" val={details ? details['userType'] : ''} options={usertype} handleVal={(val) => setuserID(val)} edit={flag} ref={userRef} />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="name">View</label>
                <span style={{ 'color': '#ff0000' }}>  *</span>
                <Multiselect
                  options={option} // Options to display in the dropdown
                  selectedValues={selectedViews}
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  disable={flag ? false : true}
                />
                {err == true && selectedViews && selectedViews.length == 0 ? <div className="phoneInputRequired">This field is required </div> :
                  ''}
              </Col>
              <Col md="6" className="form-group">
                <CheckBox Name="Status" className="withInput" value={status} edit={flag} handleVal={() => setStatus(!status)} />
              </Col>

              <Col sm="12" className="form-group">
                <div className='formBtns mt-3 text-right'>
                  {flag && (details ? (editable ? <Button theme="white" onClick={() => cancel()}>Close</Button> : '') : <Button theme="white" onClick={() => cancel()}>Close</Button>)}
                  {flag ? (details ? (editable ? < Button theme="accent" onClick={() => checkValidationsisNext()}>Save</Button> : '') : < Button theme="accent" onClick={() => checkValidationsisNext()}>Save</Button>) : ((details && !editable) ? '' : < Button theme="accent" onClick={() => makeEditale()}>Edit</Button>)}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                {details ?
                  <SelectBox Name="Staff" Placeholder="Select Staff Member" val={stafID} optName="firstname" options={staff} handleVal={(val) => { onChangeStaff(val) }} edit={false} ref={stafRef} /> :
                  <SelectBox Name="Staff Disapble" Placeholder="Select Staff Member" val={stafID} optName="firstname" options={staff} handleVal={(val) => { onChangeStaff(val) }} ref={stafRef} />}
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <div className="staffPermissionRw overflow-auto">
                  {(permission && permission.length) ? permission.map((element, i) => {
                    return (
                      <>
                        <div key={i} className="permissionList d-flex">
                          <label className="permissionCheck-item item2 d-flex mb-0">
                            <span>{(element && element.moduleName) ? element.moduleName : ''}</span>
                          </label>
                          <div className="permissionCheck-blc d-flex ml-auto">
                            <label className="permissionCheck-item d-flex mb-0" key={element.module + 'tr'}>
                              <FormCheckbox
                                checked={isChecked(element.module, 'add')}
                                onChange={() => checBoxHandler(element, 'add')}
                                disabled={editable ? false : true}
                              />
                              <span>Add</span>
                            </label>
                            <label className="permissionCheck-item d-flex mb-0" key={element.module + 'gh'}>
                              <FormCheckbox
                                checked={isChecked(element.module, 'edit')}
                                onChange={() => checBoxHandler(element, 'edit')}
                                disabled={editable ? false : true}
                              />
                              <span>Edit</span>
                            </label>
                            <label className="permissionCheck-item d-flex mb-0" key={element.module + 'kl'}>
                              <FormCheckbox
                                checked={isChecked(element.module, 'view')}
                                onChange={() => checBoxHandler(element, 'view')}
                                disabled={editable ? false : true}
                              />
                              <span>View</span>
                            </label>
                            <label className="permissionCheck-item d-flex mb-0" key={element.module + 'lo'}>
                              <FormCheckbox
                                checked={isChecked(element.module, 'delete')}
                                onChange={() => checBoxHandler(element, 'delete')}
                                disabled={editable ? false : true}
                              /><span>Delete</span>
                            </label>
                            <label className="permissionCheck-item d-flex mb-0" key={element.module + 'log'}>
                              <FormCheckbox
                                checked={isChecked(element.module, 'search')}
                                onChange={() => checBoxHandler(element, 'search')}
                                disabled={editable ? false : true}
                              /><span>Search</span>
                            </label>
                          </div>
                        </div>
                      </>
                    )
                  }) : ''}
                </div>
              </Col>
            </Row>

            {/* <Col sm="12" className="form-group"> */}
            {/* <div className='formBtns mt-4'> */}
            <div className='formBtns mt-4 text-right'>
              {/* <Button theme="white">Close</Button> */}
              {flag && (details ? (editable ? <Button theme="white" onClick={() => cancel()}>Close</Button> : '') : <Button theme="white" onClick={() => cancel()}>Close</Button>)}
              {flag ? (details ? (editable ? < Button theme="accent" onClick={() => savePermission()}>
                Save</Button> : '') : < Button theme="accent" onClick={() => savePermission()}>Save</Button>) : ((details && !editable) ? '' : < Button theme="accent" onClick={() => makeEditale()}>Edit</Button>)}
            </div>
            {/* </Col> */}
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="6">
                {/* <SelectBox Name="User Type" Placeholder="Select Staff Member" /> */}
                {details ?
                  <SelectBox Name="Staff" Placeholder="Select Staff Member" val={staffID} optName="firstname" options={staff} handleVal={(val) => setStaffID(val)} edit={false} ref={staffRef} /> :
                  <SelectBox Name="Staff" Placeholder="Select Staff Member" val={staffID} optName="firstname" options={staff} handleVal={(val) => setStaffID(val)} edit={flag} ref={staffRef} />}
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <div className="staffPermissionRw assign temp  d-flex flex-wrap overflow-auto">
                  {
                    client.map((element, index) => {
                      return (
                        <>
                          <div key={index} className="assignCheck-blc flex-column d-flex">
                            <label className="permissionCheck-item item2 d-flex">
                              {flag ?
                                <FormCheckbox
                                  checked={selected.includes(element['@rid']) ? true : false}
                                  onChange={(e) => handleCheck(element['@rid'], selected.includes(element['@rid']) ? true : false)}
                                  disabled={false}
                                /> :
                                <FormCheckbox
                                  checked={selected.includes(element['@rid']) ? true : false}
                                  onChange={(e) => handleCheck(element['@rid'], selected.includes(element['@rid']) ? true : false)}
                                  disabled={true}
                                />
                              }
                              <span>{element.contactName}</span>
                            </label>
                            {errassign && errassign.length > 0 && errassign.includes(element['@rid']) ?
                              <div className="phoneInputRequired">Client already assigned to other Staff</div> :
                              ''}
                          </div>

                        </>
                      )
                    })
                  }
                </div>
              </Col>
              <Col sm="12" className="form-group">
                <div className='formBtns mt-4 text-right'>
                  {flag && (details ? (editable ? <Button theme="white" onClick={() => cancel()}>Close</Button> : '') : <Button theme="white" onClick={() => cancel()}>Close</Button>)}
                  {flag ? (details ? (editable ? < Button theme="accent" onClick={() => saveData()}>Save</Button> : '') : < Button theme="accent" onClick={() => saveData()}>Save</Button>) : ((details && !editable) ? '' : < Button theme="accent" onClick={() => makeEditale()}>Edit</Button>)}
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>

    </>
  );
}

export default TabBlock;
