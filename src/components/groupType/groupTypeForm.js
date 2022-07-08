import React, { useState, createRef } from "react";

import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox } from './../common/FormsInput';



const GroupTypeForm = ({ title, details, editable = false, submitData, cancel }) => {
  const nameRef = createRef();
  const [name, setName] = useState(details ? details['name'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const _handleKeypress = (e) => {
    e.preventDefault();
    submitForm();
    return false;
  }

  const submitForm = () => {
    nameRef.current.props.onChange(name);
    if (name === '') console.log("Values should not be empty");
    else if (name.length < 1) console.log("Name should be gtreater then 4");
    else {
      let payload = { name: name, status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
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
                    <TextBox Name="Group Type Name" Placeholder="Enter Group Type Name" min={1} value={details ? details['name'] : ''} edit={details ? (editable ? true : false) : true} handleVal={(val) => setName(val)} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  {/* Status */}
                  <Col md="6" className="form-group">
                    <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
                  </Col>
                </Row>
                <div className='formBtns text-right'>
                  {details ? editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '' : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                  {details ? editable ? <Button theme="accent" onClick={() => submitForm()}>Update</Button> : '' : <Button theme="accent" onClick={() => submitForm()}>Submit</Button>}
                </div>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card >
  );
}

GroupTypeForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

GroupTypeForm.defaultProps = {
  title: "Account Details"
};

export default GroupTypeForm;
