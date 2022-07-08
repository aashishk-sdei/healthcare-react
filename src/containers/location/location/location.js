import React from "react";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Card,
    Form,
    FormSelect,
    FormGroup
} from "shards-react";


import PageHeader from '../../../components/common/PageHeader/PageHeader';
import FormButtons from '../../../components/common/FormButtons/FormButtons';
import LocationForm from './locationForm/locationForm';
import LocationMap from './locationMap/locationMap';
import LocationServices from './locationServices/locationServices';
import LocationTime from './locationTime/locationTime';

import './location.scss';
const Loacation = () => {
    return (
        <div className="locationWrapper">
            <PageHeader button={true} buttonLabel="Add Detail" buttonIcon="add" title="Add Location" subtitle="Location Overview" />
            <Row>
                <Col lg="12">
                    <Card small className="mb-4">
                        <Col className="p-3" lg="12">
                            <Form>
                                <Row className="locationRw">
                                    <LocationForm />
                                    <LocationMap />
                                </Row>
                                <Row className="locationRw mb-1 row">
                                    <Col lg="12">
                                        <LocationServices />
                                        <LocationTime />
                                    </Col>
                                </Row>
                                <Row className="locationRw">
                                    <Col lg="12">
                                        <div className="locationInputBlc">
                                            <FormGroup className="mb-0">
                                                <label htmlFor="Language">Location Access</label>
                                                <FormSelect id="feInputState">
                                                    <option>Choose...</option>
                                                    <option>...</option>
                                                </FormSelect>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="locationRw">
                                    <Col lg="12">
                                        <div className="locationInputBlc">
                                            <FormGroup className="">
                                                <label>Location Description</label>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <FormButtons />
                            </Form>

                        </Col>
                    </Card>

                </Col>
            </Row>
        </div>
    );
}
Loacation.propTypes = {
    title: PropTypes.string
};

Loacation.defaultProps = {
    title: "Update Location Category"
};
export default Loacation;
