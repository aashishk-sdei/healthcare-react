import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ConfirmBlock from '../Modal/ConfirmBlock/ConfirmBlock';
const ModalCell = (val) => {
    const [modal, setModal] = useState(val);
    const toggle = () => setModal(!modal);

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} className="confirmModal">
                <ModalHeader toggle={toggle}>Confirm</ModalHeader>
                <ModalBody>
                    <ConfirmBlock />
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>OK</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </>
    )
}
export default ModalCell;