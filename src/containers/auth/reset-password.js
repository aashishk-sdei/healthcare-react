import React, { useState, createRef } from "react";
import { useDispatch } from 'react-redux';

import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button } from "shards-react";

import { ConfirmPasswordBox, PasswordBox } from '../../components/common/FormsInput';
import { reset_password } from './../../context/actions/user';
import PageTitle from "../../components/common/PageTitle";
import './account.scss';


const ResetPassword = ({ history }) => {
  const dispatch = useDispatch();
  const passRef = createRef(); const cnfPassRef = createRef();


  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');

  const _handleKeypress = (e) => { submitForm(); }


  const submitForm = () => {
    passRef.current.props.onChange(password);
    cnfPassRef.current.props.onChange(confpassword);

    if (password === '' || confpassword === '') console.log("Values should not be empty");
    else if (password.length < 8 || confpassword.length < 8 || password !== confpassword) console.log("Password and confirm password should be greater then 8");
    else {
      dispatch(reset_password({ password: password }, (result) => {
        if (result.messageID = 200)
          history.push('/login');
      }));
    }
  }

  return <div className="account-block">
    <div className="page-header text-center">
      <PageTitle title="Reset Password" subtitle="Reser Password Form" className="mb-4" />
    </div>
    <Card className="loginBox p-4">
      <Form>
        <Row form>
          <Col sm="12" className="form-group">
            <PasswordBox Name="New Password" Placeholder="New Password" handleVal={(val) => setPassword(val)} ref={passRef} handleKeypress={(e) => _handleKeypress(e)} />
          </Col>
          <Col sm="12" className="form-group">
            <ConfirmPasswordBox Name="Confirm Password" Placeholder="Confirm Password" match={password} handleVal={(val) => setConfPassword(val)} ref={cnfPassRef} handleKeypress={(e) => _handleKeypress(e)} />
          </Col>
        </Row>
        <div className="account-btn">
          <Button pill block theme="primary" onClick={() => submitForm()}>
            Reset Password
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

export default ResetPassword;
