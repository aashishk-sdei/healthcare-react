import React from "react";
import {
    Row,
    Col,
    FormInput,
    FormSelect
} from "shards-react";
import './locationForm.scss';
const LocationMap = () => {
    return (
        <Col lg="6" className="locationCol">
            <Row>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="Language">Language</label>
                    <FormSelect id="feInputState">
                        <option>Choose...</option>
                        <option>...</option>
                    </FormSelect>
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="Language">Location Admin Office</label>
                    <FormSelect id="feInputState">
                        <option>Choose...</option>
                        <option>...</option>
                    </FormSelect>
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="feFirstName">
                        Name<span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="feFirstName"
                        placeholder="Name"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="addressOne">
                        Address One<span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="addressOne"
                        placeholder="Address One"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="addressTwo">
                        Address Two<span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="addressTwo"
                        placeholder="Address Two"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="city">
                        City<span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="city"
                        placeholder="City"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="country">
                        Country <span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="country"
                        placeholder="Country"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="state">
                        State<span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="state"
                        placeholder="State"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="feInputZip">Zip Code</label>
                    <FormInput
                        id="feInputZip"
                        placeholder="Zip Code"
                        type="number" />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="telephone ">Telephone </label>
                    <FormInput
                        id="Telephone"
                        placeholder="Telephone"
                        type="number" />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="Email">Email</label>
                    <FormInput
                        id="Email"
                        type="email"
                        placeholder="Email"
                        placeholder="Email"
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="Language">Location Type</label>
                    <FormSelect id="feInputState">
                        <option>Choose...</option>
                        <option>...</option>
                    </FormSelect>
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="primaryRate">
                        Primary Rate
                <span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="primaryRate"
                        placeholder="Primary Rate"
                        onChange={() => { }}
                    />
                </Col>
                <Col md="12" lg="6" className="form-group">
                    <label htmlFor="familyRate">
                        Family Rate
                <span className="text-danger requiredSign">*</span>
                    </label>
                    <FormInput
                        id="primaryRate"
                        placeholder="Family Rate"
                        onChange={() => { }}
                    />
                </Col>
            </Row>
        </Col>

    );
}
export default LocationMap;
