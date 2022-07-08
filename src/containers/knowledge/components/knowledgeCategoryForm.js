import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';

const KnowledgeCategoryFrom = ({ title, details, editable = false, submitData, cancel, languageList, categories }) => {

  const languageRef = createRef();
  const nameRef = createRef();
  const parentRef = createRef();

  const [language, setLanguage] = useState(details ? details['language'] : languageList && languageList.length ? languageList[0]['@rid'] : '');
  const [name, setName] = useState(details ? details['name'] : '');

  const [parent, setParent] = useState(details ? details['parent_id'].toString() : categories && categories.length && categories[0]['id']);

  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const _handleKeypress = (e) => {
    e.preventDefault();
    checkValidationAndSubmit();
    return false;
  }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    nameRef.current.props.onChange(name);
    parentRef.current.props.onChange(parent);
    if (language === '' || name === '' || parent === '') console.log("Values should not be empty");
    else {
      let payload = { name: name, parent_id: parent, status: status ? 1 : 2, language: language.replace('#', '') };
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
                      <SelectBox Name="Language" Placeholder="Language" val={language} options={languageList} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Category Name " Placeholder="Category Name" min="1" value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Parent" Placeholder="Select parent category" val={parent} optVal='id' options={categories} handleVal={(val) => setParent(val)} edit={editable} ref={parentRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? <Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : <Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
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

export default KnowledgeCategoryFrom;
