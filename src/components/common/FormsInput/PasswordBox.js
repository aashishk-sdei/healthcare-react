import React, { useState } from "react";
import { FormInput, FormFeedback } from "shards-react";

import { checkValidations } from './../../../utils/checkValidations';
import { validationMessage } from './../../../utils/validation';


const PasswordBox = React.forwardRef(({ Name, Placeholder, isRequired = true, edit = true, handleVal, isIcon = false, icon = false, isLocked, handleKeypress }, ref) => {
  const [password, setPassword] = useState({ value: '', isValid: false });

  const getPassword = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val) ? setPassword({ value: value, isValid: false }) : setPassword({ value: value, isValid: true })
    handleVal(value);
  }

  return (
    <>
      <label htmlFor="password">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}

      <div className={`${isIcon ? 'email-icon-dv' : ''} `}>
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
          invalid={isRequired && password.isValid}
          onKeyDown={(e) => e.keyCode === 13 && handleKeypress(e)}
          onChange={($event) => { getPassword('password', typeof $event === 'string' ? $event : $event.target.value) }}
        />
        {(isIcon) && <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => { isLocked() }}>{icon ? 'lock_open' : 'lock'}</i>}
      </div>
      {(!password.value.length) ? <FormFeedback className={password.isValid && !password.value.length ? 'customerror' : ''}>{validationMessage['fieldReq']}</FormFeedback> : ''}
      {password.value.length ? <FormFeedback className={password.isValid && password.value.length ? 'customerror' : ''}>{validationMessage['passLength']}</FormFeedback> : ''}
    </>
  );
});
export default PasswordBox;