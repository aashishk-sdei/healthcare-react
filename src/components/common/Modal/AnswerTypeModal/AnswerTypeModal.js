import React, { useState, createRef } from "react";
import { Button } from "shards-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./AnswerTypeModal.scss";
import TextBox from '../../FormsInput/TextBox';
import OptionTextBox from "./OptionTextBox.js"

const AnswerTypeModal = ({ isOpen, toggleModal, editable, options = [], addOpt, editOpt, deleteOpt, className = '' }) => {
  const textRef = createRef();
  const [value, setValue] = useState('');
  const [modal, setModal] = useState(isOpen);
  const toggle = () => { toggleModal(modal); setModal(!modal) };

  return (
    <>
      <Modal isOpen={modal} className={`answerTypeModal ${className}`}>
        <ModalHeader toggle={toggle}>Add/Remove Answers</ModalHeader>
        <ModalBody className="overflow-auto">
          <div className="answerTypeBlc">
            <ul className="list-unstyled mb-0">
              {
                options.length ? options.map((option, i) => {
                  return (
                    <OptionTextBox key={i} isView={editable} index={i} option={option.name} editOption={(i, name) => editOpt(i, name)} deleteOption={(i) => deleteOpt(i)} />
                  )
                }) : 'No added option available !!'
              }
            </ul>
          </div>
        </ModalBody>
        {editable ? <ModalFooter className="pl-2 pr-2 pt-2 pb-2">
          <div className="addQuestion answerTypeBlc flex-fill">
            <ul className="list-unstyled mb-0">
              <li className="d-flex">
                <div className="answerTypeInput flex-fill">
                  <TextBox Placeholder="Enter new option" isRequired={false} value={value} handleVal={(val) => setValue(val)} ref={textRef} />
                </div>
                <div className="answerTypeBtns">
                  <Button theme="primary" disabled={value.length === 0} className="p-0" onClick={() => { addOpt(value); textRef.current.props.onChange(''); }}>
                    <i className="material-icons">add_circle_outline</i>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </ModalFooter> : ''}
      </Modal>
    </>
  );
};

export default AnswerTypeModal;
