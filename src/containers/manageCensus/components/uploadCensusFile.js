import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";
import { Link } from "react-router-dom";
import BrowseInputCell from '../../../components/common/BrowseInputCell/BrowseInputCell';

const UploadCensusForm = ({ details, editable = false, submitData, cancel }) => {
    const [logourl, setLogo] = useState(details ? details['logourl'] : '');

    const checkValidationAndSubmit = () => {
        let formData = new FormData();
        formData.append("image", logourl);
        submitData(formData);
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
                                    <Col lg="12" className="form-group"></Col>
                                        <Col lg="6" className="form-group">
                                            <BrowseInputCell view={details ? editable ? false : true : false} logoUrl={logourl} handleImageSelect={(file) => setLogo(file)} displayLabel="Choose csv file" acceptFile=".csv" image={false} fileType="text/csv"/>
                                        </Col>
                                        <Col lg="6" className="form-group">
                                            <Row>
                                            <Link to="./SD_Test_2020_1.csv" target="_blank"><i className="material-icons">cloud_download</i></Link><span className="text-danger"> Download sample csv template</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div className='formBtns text-right'>
                                        {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                                        {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>upload</Button>}
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

export default UploadCensusForm;
