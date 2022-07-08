import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox, ColourPickerBox } from '../../../components/common/FormsInput';

const ManageSurveyForm = ({ title, details, categories, Language, editable = false, submitData, cancel }) => {

  const languageRef = createRef();
  const categoryNameRef = createRef();
  const parentIdRef = createRef();
  const colourRef = createRef();
  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length > 0 ? Language[Language.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [categoryName, setCategoryName] = useState(details ? details['categoryName'] : '');
  const [parentId, setParentId] = useState(details ? details['parentId'].toString() : categories && categories.length && categories[0]['id']);
  const [colour, setColour] = useState(details ? details['colour'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const _handleKeypress = (e) => checkValidationAndSubmit();

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    categoryNameRef.current.props.onChange(categoryName);
    parentIdRef.current.props.onChange(parentId);
    colourRef.current.props.onChange(colour);
    if (language === '' || categoryName === '' || parentId === '' || colour === '') console.log("Values should not be empty");
    else if (language.length <= 1 || categoryName.length < 1 || colour.length <= 2 || colour.length > 20) console.log("categoryName should have more then 4 is requioed.");
    else {
      let payload = { categoryName: categoryName, language: language, parentId: parentId, colour: colour, status: status ? 1 : 2 };
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
                      <SelectBox Name="Language" Placeholder="Select Language" val={language} options={Language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox Name="Category Name" Placeholder="Category Name" min={1} value={categoryName} handleVal={(val) => setCategoryName(val)} edit={editable} ref={categoryNameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Parent" Placeholder="Select Parent Category" val={parentId} optVal='id' options={categories} handleVal={(val) => setParentId(val)} edit={editable} ref={parentIdRef} />
                    </Col>
                    <Col md="6" className="form-group">
                      <ColourPickerBox Name="Colour" Placeholder="Colour" value={colour} handleVal={(val) => setColour(val)} edit={editable} ref={colourRef} />
                    </Col>
                  </Row>

                  <Row form>
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

export default ManageSurveyForm;
