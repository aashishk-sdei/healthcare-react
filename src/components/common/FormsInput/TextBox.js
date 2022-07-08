import React, { useState } from "react";
import { FormInput, FormFeedback, Button } from "shards-react";
import { checkValidations } from './../../../utils/checkValidations';
import { validationMessage } from './../../../utils/validation';
import './TextBox.scss';
const TextBox = React.forwardRef(({ Name, Placeholder, min = 1, max = 500000, value = '', dynamic = false, allowCharOnly = false, isRequired = true, icon = 'add', edit = true, handleVal, isNumber = false,
  colorPicker = false, className = '', button = false, handleClick, handleKeypress = (e) => e.preventDefault() }, ref) => {
  const [text, setText] = useState({ value: value, isValid: false });
  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, min, max) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }
  return (
    <>
      {Name ? <label htmlFor="name" >{Name}</label> : ''}
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className={`inputBlock position-relative 
      ${colorPicker ? 'colorPickerWrapper' : ''}
      ${className}
      `}>
        <FormInput
          ref={ref}
          id="feName"
          placeholder={Placeholder}
          name="name"
          type={isNumber ? 'number' : 'text'}
          value={allowCharOnly ? text.value.replace(/[^A-Za-z]/ig, '') : text.value}
          disabled={!edit}
          maxLength={max + 1}
          required
          invalid={isRequired && text.isValid}
          onKeyDown={(e) => { e.keyCode === 13 && handleKeypress(e) }}
          onChange={($event) => { getText('text', typeof $event === 'string' || typeof $event === 'number' ? $event : $event.target.value) }}
        />
        {
          button ? <Button theme="accent" className="position-absolute rounded-circle p-0" onClick={() => handleClick()}>
            <i className="material-icons">{icon}</i>
          </Button>
            : null
        }
        {!dynamic && (!text.value || text.value == '') ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
        {!dynamic &&(text.value && text.value.replace(/\s+/g, ' ').trim().length === 0) ? <FormFeedback>{validationMessage['invalidValue']}</FormFeedback> : ''}
        {!dynamic &&(text.value && text.value.length < min) ? <FormFeedback>{isNumber ? validationMessage['numberInvalid'](min) : validationMessage['textInvalid'](min)}</FormFeedback> : ''}
        {!dynamic &&(text.value && text.value.length > max) ? <FormFeedback>{isNumber ? validationMessage['numberMaxInvalid'](max) : validationMessage['textMaxInvalid'](max)}</FormFeedback> : ''}
      </div>
    </>
  );
});

export default TextBox;