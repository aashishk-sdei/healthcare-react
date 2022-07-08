import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Button } from "shards-react";
import "./DetailsModal.scss";
import LoaderUI from "../../../common/Loader/Loader";
import Heading3 from '../../Heading3/Heading3';
import ConfirmBlock from '../ConfirmBlock/ConfirmBlock';

const DetailsModal = ({ details, modules, handleModuleLink }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({ type: 'delete', groupID: '', moduleID: '', moduleName: '' });
  const toggle = () => setModal(!modal);

  let { loading } = useSelector(state => state.general);

  const deleteModuleLink = (groupId, moduleId) => {
    setData({ type: 'delete', groupID: groupId, moduleID: moduleId });
    setModal(!modal);
  }

  // Handle Delete confirm 
  const isConform = async (resp) => {
    setModal(!modal);
    if (resp === 'ok') handleModuleLink(data)
  }


  return (
    <>
      {loading && <LoaderUI
        loader={loading}
        overlay={true}
        overlayRadius='rounded-10'
        FullWindow={false}
        color="primary"
      />}
      <div className="DetailsModal">
        <Heading3>{details.groupName} Modules :</Heading3>
        <div className="modalDetailInner overflow-auto">
          <ul className="list-unstyled">
            {modules.length ? modules.map((item, index) => {
              return (
                (item.moduleName === 'Manage Master Module' || item.moduleName === 'Manage View' || item.moduleName === 'Manage Groups' || item.moduleName === 'Manage Group Types')
                  ? '' : <li key={index} className="d-flex">
                    <span className="flex-fill">{item.moduleName}</span>
                    {details.modules.some(module => module.moduleID === item['@rid']) ?
                      (<Button size="sm" theme="danger" title={item.moduleName} onClick={() => deleteModuleLink(details['@rid'], item['@rid'])}><i className="material-icons">delete</i>Remove</Button>) :
                      (<Button size="sm" title={item.moduleName === 'Manage Master Module' || item.moduleName === 'Manage View' || item.moduleName === 'Manage Groups' || item.moduleName === 'Manage Group Types' ? "You can not add this module" : item.moduleName} onClick={() => handleModuleLink({ type: 'add', groupID: details['@rid'], moduleID: item['@rid'], moduleName: item.moduleName })}><i className="material-icons">add_circle_outline</i>Add</Button>)}
                  </li>
              )
            }) : <li>'No Module assigned for the selected group'</li>}
          </ul>
        </div>
      </div>

      {<Modal isOpen={modal} toggle={toggle} className="confirmModal">
        <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
        <ModalBody>
          <ConfirmBlock remove='remove' confirm={(resp) => isConform(resp)} />
        </ModalBody>
      </Modal>}
    </>
  );
};

export default DetailsModal;
