import React, { useState } from "react";
import { FormInput, FormFeedback, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "shards-react";
import { checkValidations } from '../../../utils/checkValidations';
import { validationMessage } from '../../../utils/validation';
import './TitleTextBox.scss';

const TitleTextBox = React.forwardRef(({ Name, Placeholder, titleVal = 'Mr', min = 4, max = 100000, value = '', edit = true, handleTitle, handleVal, handleKeypress }, ref) => {
  const [title, setTitle] = useState(titleVal);
  const [text, setText] = useState({ value: value, isValid: false });
  const [collapse, setCollapse] = useState(false);

  const getText = (name, value) => {
    const val = value.replace(/\s+/g, ' ').trim();
    checkValidations(name, val, min, max) ? setText({ value: value, isValid: false }) : setText({ value: value, isValid: true })
    handleVal(value);
  }
  const toggle = () => {
    setCollapse(!collapse);
  }
  return (
    <>
      <label htmlFor="name" >{Name}</label>
      <span style={{ 'color': '#ff0000' }}>  *</span>
      <div className="inputWrapper">
        <div className="labelDropdownWrapper position-relative">
          <Dropdown open={collapse} toggle={toggle} className="labelDropdownBlc position-absolute" disabled={!edit}>
            <DropdownToggle className="btn-link btn shadow-none d-inline-flex align-items-center justify-content-center p-0 h-100">
              <label className="mb-0">{title}</label>
              <span>
                <i className="material-icons">expand_more</i>
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => { setTitle('Mr'); handleTitle('Mr') }}>Mr</DropdownItem>
              <DropdownItem onClick={() => { setTitle('Mrs'); handleTitle('Mrs') }}>Mrs</DropdownItem>
              <DropdownItem onClick={() => { setTitle('Miss'); handleTitle('Miss') }}>Miss</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <FormInput
            ref={ref}
            id="feName"
            placeholder={Placeholder}
            name="name"
            value={text.value}
            disabled={!edit}
            maxLength={max + 1}
            required
            invalid={text.isValid}
            onKeyDown={(e) => e.keyCode === 13 && handleKeypress(e)}
            onChange={($event) => { getText('name', typeof $event === 'string' ? $event : $event.target.value) }}
          />
          {(!text.value.length) ? <FormFeedback>{validationMessage['fieldReq']}</FormFeedback> : ''}
          {(text.value.length && text.value.length < min) ? <FormFeedback>{validationMessage['textInvalid'](min)}</FormFeedback> : ''}
          {(text.value.length && text.value.length > max) ? <FormFeedback>{validationMessage['textMaxInvalid'](max)}</FormFeedback> : ''}

        </div>
      </div>
    </>
  );
});
export default TitleTextBox;