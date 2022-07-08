import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Card,
    Form,
    FormInput,
    FormSelect,
    FormTextarea,
    FormCheckbox
} from "shards-react";


import PageHeader from '../../../components/common/PageHeader/PageHeader';
import FormButtons from '../../../components/common/FormButtons/FormButtons';
import SwitchCell from '../../../components/common/SwitchCell/SwitchCell';
import BrowseInputCell from '../../../components/common/BrowseInputCell/BrowseInputCell';
const LoacationCategory = () => {
    const [checbox, setCheckbox] = useState(false);
    const handleChange = (e) => {
        setCheckbox(!checbox)
    }
    return (
        <div className="locationWrapper">
            <PageHeader button={true} buttonLabel="Add Detail" buttonIcon="add" title="Update Location Category" subtitle="Location Overview" />
            <Row>
                <Col lg="12">
                    <Card small className="mb-4">
                        <Col className="p-3" lg="12">

                            <Form>
                                <Row form>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="Language">Language</label>
                                        <FormSelect id="feInputState">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </FormSelect>
                                    </Col>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="feFirstName">
                                            Name<span className="text-danger requiredSign">*</span>
                                        </label>
                                        <FormInput
                                            id="feFirstName"
                                            placeholder="First Name"
                                            value="Sierra"
                                            onChange={() => { }}
                                        />
                                    </Col>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="Language">Button Label</label>
                                        <FormSelect id="feInputState">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </FormSelect>
                                    </Col>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="feLastName">Description</label>
                                        <FormInput
                                            id="feLastName"
                                            placeholder="Last Name"
                                            value="Brooks"
                                            onChange={() => { }}
                                        />
                                    </Col>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="feLastName">Show in Menu</label>
                                        <SwitchCell className="formSwitchCell mt-2" />
                                    </Col>
                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="feLastName">Location Categories</label>
                                        <FormCheckbox
                                            checked={checbox}
                                            onChange={e => handleChange(e,)}
                                        >
                                            Similar Clinic
                                        </FormCheckbox>
                                    </Col>

                                    <Col md="6" lg="4" className="form-group">
                                        <label htmlFor="feLastName">Upload File</label>
                                        <BrowseInputCell className="mt-2" />
                                    </Col>

                                    <Col md="12" className="form-group">
                                        <label htmlFor="feDescription">Description</label>
                                        <FormTextarea id="feDescription" rows="5" />
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
LoacationCategory.propTypes = {
    title: PropTypes.string
};

LoacationCategory.defaultProps = {
    title: "Update Location Category"
};
export default LoacationCategory;
