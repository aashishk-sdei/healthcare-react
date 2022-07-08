import React, { useState } from "react";
import {
    FormInput,
    FormCheckbox,
    FormRadio,
    FormGroup
} from "shards-react";
import Heading3 from '../../../../components/common/Heading3/Heading3';
import './locationTime.scss';
const LocationTime = () => {
    const [checbox, setCheckbox] = useState(false);
    const handleChange = () => {
        setCheckbox(!checbox)
    }
    const [radioBox, setRadioBox] = useState(false);
    const radioHandleChange = () => {
        setRadioBox(!radioBox)
    }
    return (
        <div className="locationinnerRw">
            <Heading3>Location Opening Times:</Heading3>
            <div className="locationTimeCol d-flex">
                <label className="locationTimeLabel">Availability</label>
                <FormRadio
                    checked={radioBox}
                    onChange={e => radioHandleChange(e,)}
                >
                    24*7
                </FormRadio>
            </div>
            <div className="locationTimeCol d-flex align-items-center">
                <label className="locationTimeLabel">Monday-Friday</label>
                <div className="weekTime d-flex flex-wrap">
                    <FormGroup className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </FormGroup>
                    <FormGroup className=" weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </FormGroup>
                </div>
            </div>
            <div className="locationTimeCol d-flex">
                <label className="locationTimeLabel">Add Custom Hours</label>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Add
                </FormCheckbox>
            </div>

            <div className="locationTimeCol customTimeRw d-flex flex-wrap">
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Monday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Tuesday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Wednesday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Thursday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Friday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Saturday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
                <FormGroup className="mb-0 customTime">
                    <label htmlFor="time">Sunday</label>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Open Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                    <div className="weekTimeCol position-relative">
                        <FormInput
                            id="customOption"
                            placeholder="Close Time"
                            type="text"
                        />
                        <i className="material-icons position-absolute">
                            schedule
                        </i>
                    </div>
                </FormGroup>
            </div>
            <div className="locationTimeCol">
                <Heading3>Closed Days:</Heading3>
            </div>
        </div>
    );
}
export default LocationTime;
