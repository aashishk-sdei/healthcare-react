import React from "react";
import { FormCheckbox } from "shards-react";
import './CheckBox.scss';
const CheckBox = React.forwardRef(({ Name, value = false, edit = true, handleVal, className = '' }) => {

  return (
    <>
      <label htmlFor="feEmail" className="d-block">{Name}</label>
      <FormCheckbox
        id="feCheckbox"
        name="status"
        toggle
        checked={value}
        invalid={edit}
        disabled={!edit}
        className={`d-inline-flex ${className}`}
        onChange={() => edit && handleVal()}>
      </FormCheckbox>
    </>
  );

});
export default CheckBox;