import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import ConfirmBlock from '../Modal/ConfirmBlock/ConfirmBlock';
import "./DropdownCell.scss";
import "../Modal/Modal.scss";
const DropdownCell = ({ handleAction, className = '', btnClass = '', direction = 'up', DropdownMenuRight = true, deleteOption = true }) => {
    const [dropwnOpen, setDropdownOpen] = useState(false);
    const dropdownHandler = () => {
        setDropdownOpen(!dropwnOpen)
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    // Handle Delete confirm 
    const isConform = async (resp) => {
        setModal(!modal);
        if (resp === 'ok') handleAction('Delete');
        if (resp === 'no') console.log("Not confirm the delete button");
    }

    return (
        <>
            <Dropdown direction={direction} open={dropwnOpen} toggle={dropdownHandler} className={`d-table searchFilter-dropdown ${className}`}>
                <DropdownToggle className={`searchFilter-action d-inline-flex align-items-center justify-content-center ${btnClass}`}>
                    Action
                    <span className="d-inline-flex align-items-center justify-content-center">
                        <i className="material-icons position-static mr-0"> play_arrow </i>
                    </span>
                </DropdownToggle>
                <DropdownMenu right={DropdownMenuRight}>
                    {deleteOption ?
                        <DropdownItem className="d-inline-flex align-items-center" onClick={() => { setModal(!modal); }}>
                            <span className="d-inline-flex align-items-center justify-content-center">
                                <i className="material-icons position-static mr-0"> delete_outline </i>
                            </span>
                        Delete
                    </DropdownItem> : ''
                    }
                    <DropdownItem className="d-inline-flex align-items-center" onClick={() => handleAction('Active')}>
                        <span className="d-inline-flex align-items-center justify-content-center">
                            <i className="material-icons position-static mr-0"> check_circle_outline </i>
                        </span>
                        Active
                    </DropdownItem>
                    <DropdownItem className="d-inline-flex align-items-center" onClick={() => handleAction('Inactive')}>
                        <span className="d-inline-flex align-items-center justify-content-center">
                            <i className="material-icons position-static mr-0"> highlight_off </i>
                        </span>
                        Inactive
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Modal isOpen={modal} toggle={toggle} className="confirmModal">
                <ModalHeader toggle={toggle}>Confirm</ModalHeader>
                <ModalBody>
                    <ConfirmBlock confirm={(resp) => isConform(resp)} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default DropdownCell;
