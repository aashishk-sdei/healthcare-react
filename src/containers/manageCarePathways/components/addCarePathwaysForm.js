import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import TableList4 from '../../../components/common/TableList/TableList4';
import { toast } from "react-toastify";
const CarePathwayFrom = ({ title, details, editable = false, submitData, cancel, ageList, _page, genaderList, languages, diagnosis, handleSearch, _loadMore, _history }) => {

  const nameRef = createRef();
  const ageRef = createRef();
  const genderRef = createRef();
  const languageRef = createRef();
  let langCode = details.language ? languages.filter(e => e._id === details.language)[0].code : 'en';
  const [language, setLanguage] = useState(details ? details.language : '');
  const [name, setName] = useState(details ? details['name'] : '');
  const [age, setAge] = useState(details ? details['age'] : 'Adult');
  const [gender, setGender] = useState(details ? details['gender'] : 'Male');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [selected, setSelected] = useState(details ? JSON.parse(details.diagnosis) : []);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(details ? JSON.parse(details.diagnosis) : []);

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    ageRef.current.props.onChange(age);
    genderRef.current.props.onChange(gender);
    if (name === '' || age === '' || gender === '') console.log("Values should not be empty");
    else {
      let payload = { name: name, age: age, gender, gender, diagnosis: JSON.stringify(selectedDiagnosis), status: status ? 1 : 2 };
      if (details && details._id) payload = { ...payload, recordId: details._id };
      submitData(payload);
    };
  }
  const setLang = (id) => {
    const filterLan = languages.filter(e => e._id === id);
    if (details && details.name[filterLan[0].code])
      setName(details.name[filterLan[0].code]);

  }

  const removeCode = async (index) => {
    const indx = selected.findIndex(e => e._id === index)
    selected.splice(indx, 1);
    selectedDiagnosis.splice(indx, 1);
    setSelectedDiagnosis([...selectedDiagnosis]);
    setSelected([...selected]);

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
                      <SelectBox Name="language" Placeholder="Select language" val={language} optVal='_id' optNameChild="en" options={languages} handleVal={(val) => { setLanguage(val); setLang(val); }} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Care Pathway" Placeholder="Care Pathway" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} />
                    </Col>
                    {/* Select */}
                    <Col md="6" className="form-group">
                      <SelectBox Name="Gender" Placeholder="Select gender" val={gender} optVal='key' optName='value' options={genaderList} handleVal={(val) => setGender(val)} edit={editable} ref={genderRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Age" Placeholder="Select age" val={age} optVal='key' optName='value' options={ageList} handleVal={(val) => setAge(val)} edit={editable} ref={ageRef} />
                    </Col>
                  </Row>
                  <Row >
                    {details && selected.length > 0 ? <Col md="12 " className="form-group">
                      <div className="diagnose-dv">
                        {selected && selected.map((e, i) => <div className="diagnose-inner" style={!editable ? { 'pointerEvents': 'none', 'opacity': '0.4' } : {}} key={i} >{e.name}<span onClick={() => { removeCode(e._id) }}><i className="fa fa-times" aria-hidden="true"></i></span></div>
                        )}
                      </div>
                    </Col> : ''}
                  </Row>
                </Form>
                {editable && <Row >
                  <Col md="12 " className="form-group">
                    <label> Diagnosis</label>
                    <TableList4
                      list={diagnosis.records}
                      count={diagnosis.count}
                      page={_page}
                      type={'Diagnosis'}
                      selectedItem={selectedDiagnosis}
                      handleSearch={(val) => handleSearch(val)}
                      handleSelectedAction={val => { setSelectedDiagnosis(val) }}
                      isSearch={true}
                      history={_history}
                      isLoad={true}
                      loadMore={(val) => _loadMore(val)}
                    />
                  </Col>
                </Row>}
              </Col>
            </Row>
            <Row>
              {/* Status */}
              <Col md="6" className="form-group">
                <CheckBox Name="Status" className="withInput" value={status} handleVal={(first) => setStatus(!status)} edit={editable ? true : false} />
              </Col>
            </Row>
            <div className='formBtns text-right'>
              {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
              {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card >
    </>
  );
}

export default CarePathwayFrom;
