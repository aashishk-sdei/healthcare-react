import React, { useState } from "react";
import { FormTextarea, FormFeedback } from "shards-react";
import { checkValidations } from './../../../utils/checkValidations';
import { validationMessage } from './../../../utils/validation';

const TextBox = React.forwardRef(({ Name, Placeholder, min = 10, max = 1000000, value = '', dynamic = false, isRequired = true, edit = true, handleVal }, ref) => {
  const [text, setText] = useState({ value: value, isValid: false });
  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, min, max) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }
  return (
    <>
      <label htmlFor="name" >{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <FormTextarea
        ref={ref}
        id="feName"
        placeholder={Placeholder}
        name="name"
        value={text.value}
        disabled={!edit}
        maxLength={max + 1}
        required
        invalid={isRequired && text.isValid}
        onChange={($event) => { getText('text', typeof $event === 'string' ? $event : $event.target.value) }}
      />
      {!dynamic && (!text.value.length) ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
      {!dynamic &&(text.value.length && text.value.length < min) ? <FormFeedback>{validationMessage['textInvalid'](min)}</FormFeedback> : ''}
      {!dynamic &&(text.value.length && text.value.length > max) ? <FormFeedback>{validationMessage['textMaxInvalid'](max)}</FormFeedback> : ''}
    </>
  );
});
export default TextBox;