import React, { useState, useEffect, createRef } from "react";
import { Card, Row, Col, Form, Button } from "shards-react";
// import { FormCheckbox, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import PageTitle from "../../components/common/PageTitle";
import { EmailBox, PasswordBox } from './../../components/common/FormsInput';
import { login, loader } from './../../context/actions/user';

import './account.scss';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(loader(false)); }, []);

  const emailRef = createRef(); const passRef = createRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [checkBox, setcheckBox] = useState(false);

  const _handleKeypress = (e) => { submitForm(); }

  const submitForm = () => {
    emailRef.current.props.onChange(email);
    passRef.current.props.onChange(password);
    if (email === '' || password === '') console.log("Values should not be empty");
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email.length > 0) console.log("Email should be Correct : ", email);
    else if (password.length < 8) console.log("Password should be gtreater then 8");
    else {
      dispatch(login({ email: email.toLowerCase(), password: password }, (result) => {
        if (result.messageID === 200)
          history.push('/dashboard');
      }));
    }
  }

  return (
    <div className="account-block">
      <div className="page-header text-center">
        <PageTitle title="Login" subtitle="Sign In Form" className="mb-4" />
      </div>
      <Card small className="loginBox p-4">
        <Form>
          <Row form>
            <Col sm="12" className="form-group">
              <EmailBox Name='Email' Placeholder='Email' handleVal={(val) => setEmail(val)} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />
            </Col>
            <Col sm="12" className="form-group">
              <PasswordBox Name="Password" Placeholder="Password" handleVal={(val) => setPassword(val)} ref={passRef} handleKeypress={(e) => _handleKeypress(e)} />
            </Col>
          </Row>
          <div className="forgot-blc d-flex flex-wrap align-items-center">

            {/* <FormCheckbox
          checked={checkBox}
          onChange={handleChange}
        >
          Remember Me
        </FormCheckbox> */}
            <Link to="/forgot-password" className="ml-auto mb-0">
              Forgot Password?
        </Link>
          </div>
          <div className="account-btn">
            <Button pill block theme="primary" onClick={() => submitForm()}>
              Submit
      </Button>
          </div>
          <div className="formBottomTxt text-center">
            don't have an acccount? <Link to="/register">
              Register
          </Link>
          </div>
        </Form>
      </Card>
    </div>)
};

export default Login;