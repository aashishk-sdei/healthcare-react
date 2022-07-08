import React, { useState } from "react";
import { FormInput, FormFeedback } from "shards-react";
import { validationMessage } from '../../../utils/validation';


const ConfirmPasswordBox = React.forwardRef(({ Name, Placeholder, match, edit = true, isRequired = true, handleVal, handleKeypress }, ref) => {
  const [password, setPassword] = useState({ value: '', isValid: false, isMatched: false });

  const getPassword = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    (match !== val) ? setPassword({ value: val, isValid: true }) : setPassword({ value: val, isValid: false })
    handleVal(val);
  }
  return (
    <>
      <label htmlFor="password">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}

      <FormInput
        ref={ref}
        id="fePassword"
        placeholder={Placeholder}
        name="password"
        value={password.value}
        type="password"
        maxLength="20"
        disabled={!edit}
        required
        invalid={password.isValid}
        onKeyDown={(e) => e.keyCode === 13 && handleKeypress(e)}
        onChange={($event) => { getPassword('password', typeof $event === 'string' ? $event : $event.target.value) }}
      />
      {(!password.value.length) ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
      {password.value.length ? <FormFeedback>{validationMessage['confirmMsg']}</FormFeedback> : ''}
    </>
  );
});
export default ConfirmPasswordBox;