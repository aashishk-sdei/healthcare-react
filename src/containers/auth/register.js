import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Card, Row, Col, Form, Button, FormCheckbox } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { EmailBox, PasswordBox, TextBox, ConfirmPasswordBox } from './../../components/common/FormsInput';
import { register } from './../../context/actions/user';
import './account.scss';

toast.configure();

const Register = ({ history }) => {
    const dispatch = useDispatch();
    const emailRef = createRef(); const cnfPassRef = createRef()
    const passRef = createRef(); const nameRef = createRef(); const accessRef = createRef()

    const [checkBox, setcheckBox] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [accesscode, setAccesscode] = useState('');
    const handleChange = () => {
        setcheckBox(!checkBox)
    }

    const _handleKeypress = (e) => { submitForm(); }

    const submitForm = () => {

        emailRef.current.props.onChange(email);
        passRef.current.props.onChange(password);
        cnfPassRef.current.props.onChange(confpassword);
        nameRef.current.props.onChange(fullname);
        accessRef.current.props.onChange(accesscode);

        if (email === '' || fullname === '' || accesscode === '' || password === '' || confpassword === '') {
            console.log("Values should not be empty", password, confpassword);
        }
        else if (!fullname.length > 4) console.log("Fields be gtreater then 4");
        // else if(confpassword != password) console.log("Password must be same");
        else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email.length > 0) console.log("Email should be Correct : ", email);
        else if (!password.length > 8 || !confpassword.length > 8 || password !== confpassword) console.log("Password and confirm password should be greater then 8");
        else if (checkBox === false) {
            toast.warn('Please accept the Terms and conditions');
        }
        else {
            // return false
            let obj = {
                email: email.toLowerCase(),
                password: password,
                fullname: fullname,
                accesscode: accesscode,
            }
            dispatch(register(obj, (result) => {
                if (result.messageID === 200) {
                    history.push('/dashboard');
                }
            }));
        }

    }

    // Check Password and confirm password by validating
    // const getPassword = (event) => checkValidations('password', event.target.value) ? setPassword({ value: event.target.value, isValid: false }) : setPassword({ value: event.target.value, isValid: true });
    // const getConfPassword = (event) => (password.value === event.target.value) ? setConfPassword({ value: event.target.value, isValid: false }) : setConfPassword({ value: event.target.value, isValid: true });

    return <div className="account-block">
        <div className="page-header text-center">
            <PageTitle title="Register" subtitle="SignUp Form" className="mb-4" />
        </div>
        <Card className="loginBox p-4">
            <Form>
                <Row form>
                    <Col sm="12" className="form-group">
                        <EmailBox Name='Email' Placeholder='Email' handleVal={(val) => setEmail(val)} ref={emailRef} handleKeypress={(e) => _handleKeypress(e)} />

                    </Col>
                    <Col sm="12" className="form-group">
                        <PasswordBox Name="New Password" Placeholder="New Password" handleVal={(val) => setPassword(val)} ref={passRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                    <Col sm="12" className="form-group">
                        <ConfirmPasswordBox Name="Confirm Password" Placeholder="Confirm Password" match={password} handleVal={(val) => setConfPassword(val)} ref={cnfPassRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>

                    <Col sm="12" className="form-group">
                        <TextBox Name="Full Name" Placeholder="Enter Full Name" handleVal={(val) => setFullname(val)} ref={nameRef} handleKeypress={(e) => _handleKeypress(e)} />

                    </Col>
                    <Col sm="12" className="form-group">
                        <TextBox Name="Access Code" Placeholder="Enter Service Access Code" handleVal={(val) => setAccesscode(val)} ref={accessRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                </Row>
                <div className="acceptPolicy">
                    <FormCheckbox
                        checked={checkBox}
                        onChange={handleChange}
                    >
                        I acknowledge the <Link>Terms &amp; Conditions.</Link>
                    </FormCheckbox>
                </div>
                <div className="account-btn">
                    <Button pill block theme="primary" onClick={() => submitForm()}>
                        Register Now
                    </Button>
                </div>
                <div className="formBottomTxt text-center">
                    If you already have an account<Link to="login">Login</Link>
                </div>
            </Form>
        </Card>
    </div>

}

export default Register;
