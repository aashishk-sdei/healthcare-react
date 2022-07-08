import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { CheckBox, TextBox } from '../../../../../../components/common/FormsInput';

const AssignedQuestionnaireForm = ({ title, details, editable = false, submitData, cancel }) => {

  const assignedQuestionnaireRef = createRef();

  const [assignedQuestionnaire, setAssignedQuestionnaire] = useState(details ? details['assignedQuestionnaire'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);


  const checkValidationAndSubmit = () => {
    assignedQuestionnaireRef.current.props.onChange(assignedQuestionnaire);

    if (assignedQuestionnaire === '') console.log("Values should not be empty");
    else {
      let payload = { assignedQuestionnaire: assignedQuestionnaire, status: status ? 1 : 2 };
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
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <TextBox Name="Assigned Questionnaire" Placeholder="Assigned Questionnaire" min={1} max={200} value={assignedQuestionnaire} handleVal={(val) => setAssignedQuestionnaire(val)} edit={editable} ref={assignedQuestionnaireRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
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
      </Card>
    </>
  );
}

export default AssignedQuestionnaireForm;
