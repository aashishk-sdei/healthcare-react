import React, { useState } from "react";
import { FormInput, FormFeedback } from "shards-react";
import { checkValidations } from '../../../utils/checkValidations';
import { validationMessage } from '../../../utils/validation';
import './TextBox.scss';
const NumberBox = React.forwardRef(({ Name, Placeholder, min = 1, max = 500000, value = '', isRequired = true, edit = true, handleVal, handleKeypress }, ref) => {
  const [text, setText] = useState({ value: value, isValid: false });
  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, min, max) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }
  return (
    <>
      <label htmlFor="NumberField">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className='inputBlock position-relative'>
        <FormInput
          ref={ref}
          id="feNumber"
          placeholder={Placeholder}
          name="number"
          type='text'
          value={text.value}
          disabled={!edit}
          maxLength={max + 1}
          required
          pattern='\d*'
          invalid={isRequired && text.isValid}
          onKeyDown={(e) => { e.keyCode === 13 && handleKeypress(e) }}
          onChange={($event) => { getText('number', typeof $event === 'string' ? $event : $event.target.value) }}
        />
        {(!text.value || text.value == '') ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
        {(text.value && text.value.replace(/\s+/g, ' ').trim().length === 0) ? <FormFeedback>{validationMessage['invalidValue']}</FormFeedback> : ''}
        {(text.value && text.value.length) ? <FormFeedback>{validationMessage['onlyNumber']}</FormFeedback> : ''}
        {(text.value && text.value.length < min) ? <FormFeedback>{validationMessage['numberInvalid'](min)}</FormFeedback> : ''}
        {(text.value && text.value.length > max) ? <FormFeedback>{validationMessage['numberMaxInvalid'](max)}</FormFeedback> : ''}
      </div>
    </>
  );
});

export default NumberBox;