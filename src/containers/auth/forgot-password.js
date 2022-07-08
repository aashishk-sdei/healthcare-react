import React, { useState, createRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { EmailBox } from './../../components/common/FormsInput';
import { forgot_password } from './../../context/actions/user';

import './account.scss';
const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const emailRef = createRef();
  const [email, setEmail] = useState('');

  const _handleKeypress = (e) => { submitForm(); }

  const submitForm = () => {
    emailRef.current.props.onChange(email);
    if (email === '') console.log("Values should not be empty");
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email.length > 0) console.log("Email should be Correct : ", email);
    else {
      dispatch(forgot_password({ email: email.toLowerCase() }, (result) => {
        if (result.messageID = 200)
          history.push('/login');
      }));
    }
  }

  return <div className="account-block">
    <div className="page-header text-center">
      <PageTitle title="Reset Password" subtitle="Forgot Password Form" className="mb-4" />
    </div>
    <Card className="loginBox p-4">
      <Form>
        <Row form>
          <Col sm="12" className="form-group">
            <EmailBox Name='Email' Placeholder='Email' handleVal={(val) => setEmail(val)} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />
          </Col>
        </Row>
        <div className="account-btn">
          <Button pill block theme="primary" onClick={() => submitForm()}>
            Submit
            </Button>
        </div>
        <div className="backTo text-center">
          <Link to="login">
            Back to Login
            </Link>
        </div>
      </Form>
    </Card>
  </div>

}

export default ForgotPassword;
