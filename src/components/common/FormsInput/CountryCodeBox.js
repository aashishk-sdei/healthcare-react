import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { validationMessage } from './../../../utils/validation';
import 'react-phone-number-input/style.css'
import './CountryCodeBox.scss';
const CountryCodeBox = React.forwardRef(({ Name, Placeholder, value = '', edit = true, handleVal }, ref) => {
  const [number, setNumber] = useState(value);
  const [custClass, setCustClass] = useState('');
  const [valid, setValid] = useState(false);
  const [isRequired, setRequired] = useState(false);

  useEffect(() => {
    if (!edit)
      setCustClass('PhoneInputDisable');
  }, [true]);

  const handleOnFocus = () => {
    if (edit) {
      setCustClass('active');
    }
  }

  const handleOnBlur = () => {
    if (edit) {
      setCustClass('');
    }
  }


  const onChangeHandler = (val) => {
    val && setNumber(val);
    if (isValidPhoneNumber(val)) {
      setCustClass('');
      setValid(true);
    } else {
      // setCustClass('PhoneInputError');
      setValid(false);
    }

    handleVal(val);
    !number.length ? setRequired(true) : setRequired(false);
  }

  return (
    <>
      <label htmlFor="name">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <PhoneInput
        ref={ref}
        className={custClass}
        placeholder={Placeholder}
        defaultCountry="US"
        value={number}
        disabled={!edit}
        maxLength={20}
        onFocus={() => handleOnFocus()}
        onBlur={() => handleOnBlur()}
        onChange={(val) => onChangeHandler(val)}
      />
      {isRequired ? <span className="phoneInputRequired">{validationMessage['fieldReq']}</span> : ''}
      {/* {number.length && !valid ? <span className="phoneInputRequired">{validationMessage['mobile']}</span> : ''} */}
    </>
  )
});

export default CountryCodeBox;