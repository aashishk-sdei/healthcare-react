import React, { useState } from "react";
import { FormInput, FormFeedback } from "shards-react";

import { checkValidations } from './../../../utils/checkValidations';
import { validationMessage } from './../../../utils/validation';


const EmailBox = React.forwardRef(({ Name, Placeholder, value = '', edit = true, isRequired = true, handleVal, isIcon = false, icon = false, isLocked, handleKeypress }, ref) => {
  const [email, setEmail] = useState({ value: value, isValid: false });
  const getEmailAddress = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val) ? setEmail({ value: value, isValid: false }) : setEmail({ value: value, isValid: true })
    handleVal(value);
  }

  return (
    <>
      <label htmlFor="feEmail">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className={`${isIcon ? 'email-icon-dv' : ''} `}>
        <FormInput
          ref={ref}
          type="email"
          id="feEmail"
          placeholder={Placeholder}
          name="email"
          value={email.value}
          disabled={!edit}
          required
          invalid={email.isValid}
          onKeyDown={(e) => e.keyCode === 13 && handleKeypress(e)}
          onChange={($event) => { getEmailAddress('email', typeof $event === 'string' ? $event : $event.target.value) }}
        />
        {(isIcon) && <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => { isLocked() }}>{icon ? 'lock_open' : 'lock'}</i>}
      </div>
      {(!email.value.length) ? <FormFeedback className={email.isValid && !email.value.length ? 'customerror' : ''}>{validationMessage['fieldReq']}</FormFeedback> : ''}
      {email.value.length ? <FormFeedback className={email.isValid && email.value.length ? 'customerror' : ''}> {validationMessage['emailInvalid']}</FormFeedback> : ''}
    </>
  );

});
export default EmailBox;