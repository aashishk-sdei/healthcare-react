import React, { useState } from "react";
import { FormSelect, FormFeedback } from "shards-react";
import { validationMessage } from '../../../utils/validation';
import './SelectBox.scss';

const ParentGroupSelectBox = React.forwardRef(({ Name, Placeholder, val = '', optName = 'name', optVal = '@rid', options, edit = true, isRequired = true, handleVal }, ref) => {
  let [opt, setOpt] = useState({ value: val, isValid: false });
  const handleOnChange = (value) => {
    if (value && value !== Placeholder) {
      setOpt({ value: value, isValid: false });
      handleVal(value);
    } else {
      setOpt({ value: '', isValid: true });
      handleVal('');
    }
  }

  return (
    <>
      <label htmlFor="name">{Name}</label>
      {isRequired && <span style={{ 'color': '#ff0000' }}>  *</span>}
      <div className='inputSelectBlock position-relative'>
        <FormSelect
          className="form-control custom-select"
          ref={ref}
          disabled={!edit}
          defaultValue={opt.value}
          invalid={opt.isValid}
          onChange={($event) => { handleOnChange(typeof $event === 'string' ? $event : $event.target.value) }}>
          <option value=''>{Placeholder}</option>
          {options && options.map((item, index) => {
            return (<>
              {(Number(item.dependencyQuestion) === 0 || item.parentId === 0 || item.id === 0) && <option key={index} value={item[optVal]}>{item[optName]}</option>}
              {options && options.map((item1, index1) => {
                return (<>
                  {((item1.dependencyQuestion === item.id && item[optName] !== "Primary") || item1.parentId === item.id) && <option key={index1} value={item1[optVal]}>{'...' + item1[optName]}</option>}
                </>)
              })}
            </>)
          })}
        </FormSelect>
        {(!opt.length) ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
      </div>
    </>
  );
});
export default ParentGroupSelectBox;