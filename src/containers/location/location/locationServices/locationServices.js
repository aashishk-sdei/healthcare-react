import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Form,
    FormInput,
    FormSelect,
    FormCheckbox,
    FormRadio,
    FormGroup
} from "shards-react";
import Heading3 from '../../../../components/common/Heading3/Heading3';
import './locationServices.scss';
const LocationServices = () => {
    const [checbox, setCheckbox] = useState(false);
    
    const handleChange = (e) => {
        let checkValue = e.currentTarget.checked
        if(checkValue){
            setCheckbox(true)
        }else if(checkValue){
            let state = checbox
            setCheckbox(false)
        }        
    }
    return (

        <div className="locationinnerRw">
            <Heading3>Location Services:</Heading3>
            <div className="locationList d-flex flex-wrap">
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Urinary Tract/Bladder Infections
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Female Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Annual Wellness Exams
            </FormCheckbox>
                <FormCheckbox
                    checked={checbox}
                    onChange={e => handleChange(e,)}
                >
                    Urinary Tract/Bladder Infections
            </FormCheckbox>
            </div>
        </div>

    );
}
export default LocationServices;
