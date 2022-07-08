import React, { useState, createRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { Card, ListGroup, FormCheckbox, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { CheckBox, TextBox } from '../common/FormsInput';
import { Multiselect } from 'multiselect-react-dropdown';
// import { GroupAdminRoutes } from './../../utils/constants';

const UserTypeForm = ({ title, views, details, modules, editable = false, submitData, cancel }) => {

  let { group, user } = useSelector(state => state);

  const nameRef = createRef();
  const [name, setName] = useState(details ? details['name'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);
  let preAssigned = [];
  details && details.assignedViews && details.assignedViews.forEach(async (element) => {
    preAssigned.push({ rid: element['@rid'], name: element.view_name })
  });
  const [selectedViews, setSelectedViews] = useState(preAssigned.length > 0 ? preAssigned : []);
  let predelected = [];
  details && details.assinedPermission && details.assinedPermission.forEach(async (element) => {
    predelected.push({ [element.module]: { edit: element.edit, add: element.add, delete: element.delete, search: element.search, view: element.view } })
  });
  const [selected, setSelected] = useState(predelected.length > 0 ? predelected : []);

  const checBoxHandler = async (id, name) => {

    if (selected && selected.length > 0) {
      let index = selected.findIndex(e => e[id]);
      if (index == -1) setSelected([...selected, { [id]: { [name]: true } }])
      else if (selected[index][id][name]) {
        selected[index][id][name] = false;
        setSelected([...selected]);
      } else {
        selected[index][id][name] = true
        setSelected([...selected]);
      }
    } else setSelected([...selected, { [id]: { [name]: true } }]);

  }

  const _handleKeypress = (e) => {
    e.preventDefault();
    submitForm();
    return false;
  }

  const submitForm = () => {
    nameRef.current.props.onChange(name);
    nameRef.current.props.onChange(name);
    if (name === '') console.log("Values should not be empty");
    else if (name.length < 4) console.log("Name should be gtreater then 4");
    else {
      let payload = { name: name, status: status ? 1 : 2, permission: selected, views: selectedViews };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }

  const isChecked = (id, name) => {
    if (selected.length > 0) {
      let index = selected.findIndex(e => e[id]);
      return index != -1 ? selected[index][id][name] ? true : false : false
    } return false;
  }
  const onSelect = (selectedList, selectedItem) => {
    selectedViews.push({ name: selectedItem.name, rid: selectedItem['@rid'] });
    setSelectedViews(selectedViews);

  }
  const onRemove = (selectedList, removedItem) => {
    let indx = selectedViews.findIndex(e => e.rid == removedItem.rid);
    selectedViews.splice(indx, 1);
    setSelectedViews(selectedViews);
  }
  return (
    <Card small className="mb-4" >
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* Name */}
                  <Col md="12" className="form-group">
                    <TextBox Name="User Type Name" Placeholder="Enter User Type Name" value={details ? details['name'] : ''} handleVal={(val) => setName(val)} ref={nameRef} edit={details ? (editable ? true : false) : true} handleKeypress={(e) => _handleKeypress(e)} />
                  </Col>
                  <Col md="12" className="form-group">
                    <label>Select Views</label>
                    <div className="multiselectWrapper">
                      <Multiselect
                        options={views} // Options to display in the dropdown
                        selectedValues={selectedViews}
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        disable={editable ? '' : 'true'}
                      />
                    </div>
                    {/* <div>This field is required</div> */}
                  </Col>
                  <Col lg="12" className="form-group">
                    <label>Module Permission</label>
                    <div className="staffPermissionRw overflow-auto">
                      {
                        modules.map((element, index) => {
                          return (
                            <>
                              {user.role === 3 ?
                                // (group.details.modules.findIndex(val => element.moduleName === GroupAdminRoutes[val.moduleID]) > -1) ?
                                <div key={index} className="permissionList d-flex">
                                  <label className="permissionCheck-item item2 d-flex mb-0" key={element['@rid']}>
                                    <span>
                                      {element.moduleName}
                                    </span>
                                  </label>
                                  <div className="permissionCheck-blc d-flex ml-auto">
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-add'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'add')}
                                        onChange={() => checBoxHandler(element['@rid'], 'add')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Add
                                                          </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-edit'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'edit')}
                                        onChange={() => checBoxHandler(element['@rid'], 'edit')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Edit
                                                                                            </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-view'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'view')}
                                        onChange={() => checBoxHandler(element['@rid'], 'view')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        View
                                    </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-delete'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'delete')}
                                        onChange={() => checBoxHandler(element['@rid'], 'delete')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Delete
                                                                                            </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-search'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'search')}
                                        onChange={() => checBoxHandler(element['@rid'], 'search')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        search
                                    </span>
                                    </label>

                                  </div>
                                </div>
                                // : ''
                                :
                                <div key={index} className="permissionList d-flex">
                                  <label className="permissionCheck-item item2 d-flex mb-0" key={element['@rid']}>
                                    <span>
                                      {element.moduleName}
                                    </span>
                                  </label>
                                  <div className="permissionCheck-blc d-flex ml-auto">
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-add'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'add')}
                                        onChange={() => checBoxHandler(element['@rid'], 'add')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Add
                                      </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-edit'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'edit')}
                                        onChange={() => checBoxHandler(element['@rid'], 'edit')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Edit
                                                                                          </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-view'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'view')}
                                        onChange={() => checBoxHandler(element['@rid'], 'view')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        View
                                                                                          </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-delete'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'delete')}
                                        onChange={() => checBoxHandler(element['@rid'], 'delete')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        Delete
                                                                                          </span>
                                    </label>
                                    <label className="permissionCheck-item d-flex mb-0" key={element['@rid'] + '-search'}>
                                      <FormCheckbox
                                        checked={isChecked(element['@rid'], 'search')}
                                        onChange={() => checBoxHandler(element['@rid'], 'search')}
                                        disabled={editable ? '' : 'true'}
                                      />
                                      <span>
                                        search
                                       </span>
                                    </label>

                                  </div>
                                </div>}
                            </>
                          )
                        })
                      }
                    </div>
                  </Col>

                  <Col md="12" className="form-group">
                    <CheckBox Name="Status" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
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

UserTypeForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserTypeForm.defaultProps = {
  title: "Account Details"
};

export default UserTypeForm;
