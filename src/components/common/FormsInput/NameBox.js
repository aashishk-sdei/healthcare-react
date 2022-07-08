import React, { useState } from "react";
import { FormInput, FormFeedback } from "shards-react";
import { checkValidations } from '../../../utils/checkValidations';
import { validationMessage } from '../../../utils/validation';

const NameBox = React.forwardRef(({ Name, Placeholder, maxlenth, value = '', edit = true, isRequired = true, handleVal, handleKeypress }, ref) => {
  const [text, setText] = useState({ value: value, isValid: false });
  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, maxlenth) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }

  return (
    <>
      <label htmlFor="name" >{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <FormInput
        ref={ref}
        id="feName"
        placeholder={Placeholder}
        name="name"
        value={text.value}
        disabled={!edit}
        required
        invalid={text.isValid}
        onKeyDown={(e) => e.keyCode === 13 && handleKeypress(e)}
        onChange={($event) => { getText('name', typeof $event === 'string' ? $event : $event.target.value) }}
      />
      {(!text.value.length) ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
      {text.value.length ? <FormFeedback>{validationMessage['nameInvalid']}</FormFeedback> : ''}
    </>
  );
});
export default NameBox;