import React, { useState } from "react";
import { FormInput, FormFeedback, Button } from "shards-react";
import { checkValidations } from '../../../utils/checkValidations';
import { validationMessage } from '../../../utils/validation';
import './TextBox.scss';
const UrlBox = React.forwardRef(({ Name, Placeholder, min = 4, max = 500000, value = '', isRequired = true, edit = true, handleVal, isNumber = false, colorPicker = false, className = '', button = false, handleClick }, ref) => {
  const [text, setText] = useState({ value: value, isValid: false });
  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, min, max) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }

  return (
    <>
      <label htmlFor="url" >{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className={`inputBlock position-relative ${className}`}>
        <FormInput
          ref={ref}
          id="url"
          placeholder={Placeholder}
          name="url"
          type='url'
          value={text.value}
          disabled={!edit}
          maxLength={max + 1}
          required
          invalid={isRequired && text.isValid}
          onChange={($event) => { getText('url', typeof $event === 'string' ? $event : $event.target.value) }}
        />
        {
          button ? <Button theme="accent" className="position-absolute rounded-circle p-0" onClick={() => handleClick()}>
            <i className="material-icons">add</i>
          </Button>
            : null
        }
        {(!text.value || text.value.length === '') ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
        {text.value.length ? <FormFeedback>{validationMessage['urlInvalid']}</FormFeedback> : ''}
      </div>
    </>
  );
});

export default UrlBox;