import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

const UserAccountDetails = ({ title, edit = true, details, history }) => {

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
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="First Name"
                      value="Sierra"
                      disabled={!edit}
                      onChange={() => { }}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                      id="feLastName"
                      placeholder="Last Name"
                      value="Brooks"
                      disabled={!edit}
                      onChange={() => { }}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value="sierra@example.com"
                      disabled={!edit}
                      onChange={() => { }}
                      autoComplete="email"
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      value="EX@MPL#P@$$w0RD"
                      disabled={!edit}
                      onChange={() => { }}
                      autoComplete="current-password"
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Address"
                    value="1234 Main St."
                    disabled={!edit}
                    onChange={() => { }}
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feCity">City</label>
                    <FormInput
                      id="feCity"
                      placeholder="City"
                      disabled={!edit}
                      onChange={() => { }}
                    />
                  </Col>
                  {/* State */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputState">State</label>
                    <FormSelect id="feInputState">
                      <option>Choose...</option>
                      <option>...</option>
                    </FormSelect>
                  </Col>
                  {/* Zip Code */}
                  <Col md="2" className="form-group">
                    <label htmlFor="feZipCode">Zip</label>
                    <FormInput
                      id="feZipCode"
                      placeholder="Zip"
                      disabled={!edit}
                      onChange={() => { }}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Description */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Description</label>
                    {!details ? <FormTextarea id="feDescription" rows="5" /> : ""}
                  </Col>
                </Row>
                {details ?
                  edit ? <Button theme="accent">Update Account</Button> : "" :
                  <Button theme="accent">Submit</Button>
                }
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card >
  );
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
