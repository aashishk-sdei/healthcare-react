import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import TableList4 from '../../../components/common/TableList/TableList4';
import { toast } from "react-toastify";
const CarePathwayFrom = ({ title, details, editable = false, submitData, cancel, ageList, genaderList, diagnosis, handleSearch, _history }) => {

    const nameRef = createRef();
    const ageRef = createRef();
    const genderRef = createRef();

    const [name, setName] = useState(details ? details['name'] : '');
    const [age, setAge] = useState(details ? details['age'] : 'Adult');
    const [gender, setGender] = useState(details ? details['gender'] : 'Male');
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
    const [selected, setSelected] = useState(details ? JSON.parse(details.diagnosis) : []);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(details ? JSON.parse(details.diagnosis) : []);

    const _handleKeypress = (e) => checkValidationAndSubmit();

    const checkValidationAndSubmit = () => {
        nameRef.current.props.onChange(name);
        ageRef.current.props.onChange(age);
        genderRef.current.props.onChange(gender);
        if (name === '' || age === '' || gender === '') console.log("Values should not be empty");
        else {
            let payload = { name: name, age: age, gender, gender, diagnosis: JSON.stringify(selectedDiagnosis), status: status ? 1 : 2 };
            if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
            submitData(payload);
        };
    }


    const removeCode = async (index) => {
        selected.splice(index, 1);
        selectedDiagnosis.splice(index, 1);
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
                                            <TextBox Name="Care Pathway" Placeholder="Care Pathway" min={1} value={name} handleVal={(val) => setName(val)} edit={editable} ref={nameRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Gender" Placeholder="Select gender" val={gender} optVal='key' optName='value' options={genaderList} handleVal={(val) => setGender(val)} edit={editable} ref={genderRef} />
                                        </Col>
                                        {/* Select */}
                                        <Col md="6" className="form-group">
                                            <SelectBox Name="Age" Placeholder="Select age" val={age} optVal='key' optName='value' options={ageList} handleVal={(val) => setAge(val)} edit={editable} ref={ageRef} />
                                        </Col>
                                        {/* Status */}
                                        <Col md="6" className="form-group">
                                            <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        {details && selected.length > 0 ? <Col md="12 " className="form-group">
                                            <div className="diagnose-dv">
                                                {selected && selected.map((e, i) => <div className="diagnose-inner" style={!editable ? { 'pointer-events': 'none', 'opacity': '0.4' } : {}} key={i} >{e.name}<span onClick={() => { removeCode(i) }}><i className="fa fa-times" aria-hidden="true"></i></span></div>
                                                )}
                                            </div>
                                        </Col> : ''}
                                    </Row>
                                    {editable && <Row form>
                                        <Col md="12" className="form-group">
                                            <div className="icd-outer">
                                                <div className="icd-label">
                                                    <TextBox Name="Search diagnosis" Placeholder="Search diagnosis" value={keyword} isRequired={false} handleVal={(val) => setKeyword(val)} edit={editable} />
                                                </div>
                                                <div className="icd-button">
                                                    < Button theme="accent" disabled={!editable ? true : false} onClick={() =>handleSearch(keyword)} >Search</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>}
                                    {editable && <Row >
                                        <Col md="12 " className="form-group">
                                            <div className="pathway-table">
                                                <TableList4
                                                    list={diagnosis}
                                                    type={'Diagnosis'}
                                                    selectedItem={selectedDiagnosis}
                                                    handleSelectedAction={val => { setSelectedDiagnosis(val) }}
                                                    isSearch={false}
                                                    history={_history}
                                                />
                                            </div>
                                        </Col>
                                    </Row>}
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

export default CarePathwayFrom;
