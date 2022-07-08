import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { TextBox, CheckBox, SelectBox, ColourPickerBox } from '../../../components/common/FormsInput';

const ManageDiseasesForm = ({ title, details, editable = false, submitData, cancel, languageList, parentList }) => {

  const languageRef = createRef();
  const diseaseNameRef = createRef();
  const parentRef = createRef();
  const colorHexRef = createRef();

  const [language, setLanguage] = useState(details ? details['language'] : languageList && languageList.length > 0 ? languageList[languageList.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [name, setName] = useState(details ? details['name'] : '');
  const [parent, setParent] = useState(details ? details['parent_id'].toString() : parentList && parentList.length && parentList[0]['id']);
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  const [colorHex, setColorHex] = useState(details ? details['color_hex'] : '');

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);
    diseaseNameRef.current.props.onChange(name);
    parentRef.current.props.onChange(parent);
    colorHexRef.current.props.onChange(colorHex);
    if (language === '' || name === '' || parent === '' || colorHex === '') console.log("Values should not be empty");
    else if (name.length < 1) console.log("disease_name and icdDescription should have more then 4 is requioed.");
    else {
      let payload = { name: name, parent_id: parent, status: status ? 1 : 2, color_hex: colorHex, language: language.replace('#', '') };
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
                    {/* Select */}
                    <Col md="6" className="form-group">
                      <SelectBox Name="Language" Placeholder="Language" val={language} options={languageList} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    {/* ICD 9 Code */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Disease Name" Placeholder="Disease Name" min={1} value={name} handleVal={(val) => setName(val.replace(/\s+/g, ' ').trim())} edit={editable} ref={diseaseNameRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    {/* Select */}
                    <Col md="6" className="form-group">
                      <SelectBox Name="Parent" Placeholder="Select parent category" val={parent} optVal='id' options={parentList} handleVal={(val) => setParent(val)} edit={editable} ref={parentRef} />
                    </Col>
                    {/* Color */}
                    <Col md="6" className="form-group position-relative">
                      <ColourPickerBox Name="Colour" Placeholder="Colour" value={colorHex} handleVal={(val) => setColorHex(val)} edit={editable} ref={colorHexRef} />
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

export default ManageDiseasesForm;
