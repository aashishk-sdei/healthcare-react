import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox, ColourPickerBox } from '../../../components/common/FormsInput';

const LanguageForm = ({ title, details, editable = false, submitData, cancel}) => {

  const nameRef = createRef();
  const shortCodeRef = createRef();

  const [name, setName] = useState(details ? details['name'] : '');
  const [shortCode, setShortCode] = useState(details ? details['shortCode'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    shortCodeRef.current.props.onChange(shortCode);
    if (name === '' || shortCode === '' ) console.log("Values should not be empty");
    else if (name.length < 1 || shortCode.length < 1  || shortCode.length > 3) console.log("disease_name and icdDescription should have more then 4 is requioed.");
    else {
      let payload = { name: name, shortCode: shortCode, status: status ? 1 : 2};
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
                   
                    {/* name */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Language" Placeholder="Language" min={1} value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    {/* language short code */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Short Code" Placeholder="Short Code" min={1} max={3} value={shortCode} allowCharOnly={true} handleVal={(val) => setShortCode(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={shortCodeRef} handleKeypress={(e) => _handleKeypress(e)} />
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

export default LanguageForm;
