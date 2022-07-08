import React, { useState } from "react";
import { FormSelect, FormFeedback, Button } from "shards-react";
import { validationMessage } from "../../../utils/validation";

const SelectBox = React.forwardRef(({ Name, Placeholder, val = "", optName = "name",isSub=false, optNameChild ='en', optVal = "@rid", options, edit = true, handleVal, isRequired = true, button = false, className = "", onClick = {}, view = false, dynamic = false }, ref) => {
  const [opt, setOpt] = useState({ value: val, isValid: false });
  const handleOnChange = (value) => {
    if (value && value !== Placeholder) {
      if (value.length !== 0) {
        setOpt({ value: value, isValid: false });
        handleVal(value);
      }
    } else {
      setOpt({ value: "", isValid: true });
      handleVal("");
    }
  };
  return (
    <>
      <label htmlFor="name">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className={`inputBlock position-relative ${className}`}>
        <FormSelect
          ref={ref}
          disabled={!edit}
          defaultValue={opt.value}
          invalid={isRequired && opt.isValid}
          onChange={($event) => { { handleOnChange($event ? (typeof $event === "string" || typeof $event === "number" ? $event : $event.target.value) : ''); } }}>
          <option value="">{Placeholder}</option>
          {options && options.map((item, index) => { return (<option key={index} value={item[optVal]}>{isSub?item[optName][optNameChild]:item[optName]}</option>); })}
        </FormSelect>
        {button ? (<Button onClick={onClick} theme="accent" disabled={view} className="position-absolute rounded-circle p-0"><i className="material-icons">add</i></Button>) : null}
        {!dynamic && !opt.length ? (<FormFeedback>{validationMessage["fieldReq"]}</FormFeedback>) : ("")}
      </div>
    </>
  );
}
);
export default SelectBox;
