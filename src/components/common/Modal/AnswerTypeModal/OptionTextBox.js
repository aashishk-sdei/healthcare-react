import React, { useState, useEffect } from "react";
import { Button } from "shards-react";
import { FormInput } from "shards-react";

const OptionTextBox = ({ index, isView, option, editOption, deleteOption }) => {
  const [opt, setOpt] = useState(option);
  const [isEditable, setEditable] = useState(true);

  useEffect(() => {
    if (opt !== option)
      setOpt(option)
  }, [option]);

  const toggle = (flag) => {
    setEditable(flag);
  }

  return (
    <>
      <li className="d-flex">
        <div className="answerTypeInput flex-fill">
          <FormInput type='text' disabled={isEditable} value={opt} className="addedQuestion" placeholder={option} maximum={20} onChange={(e) => setOpt(e.target.value)} />
        </div>
        <div className="answerTypeBtns">
          {!isEditable ?
            <Button theme="primary" className="p-0" disabled={opt.length === 0} onClick={() => { toggle(true); editOption(index, opt); }}>
              <i className="material-icons mr-1">check</i>
            </Button> :
            <Button theme="primary" className="p-0" disabled={isView ? (isEditable ? false : true) : true} onClick={() => setEditable(false)}>
              <i className="material-icons listACtionBtn">edit</i>
            </Button>
          }
          <Button theme="danger" className="p-0" disabled={opt.length ? (isView ? false : true) : false} onClick={() => deleteOption(index)}>
            <i className="material-icons">delete_outline</i>
          </Button>
        </div>
      </li>
    </>
  );
};

export default OptionTextBox;
