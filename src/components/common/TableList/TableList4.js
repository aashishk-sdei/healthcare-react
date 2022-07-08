import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, FormCheckbox, CardHeader, CardFooter, Button } from "shards-react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import SearchFilter from '../SearchFilter/SearchFilter';
import ConfirmBlock from './../Modal/ConfirmBlock/ConfirmBlock';
import DetailsModal from './../Modal/DetailsModal/DetailsModal';
import { CARE_PATH_DIAGNOSIS_LIST_FIELD } from './../../../utils/constants';
import NoRecord from '../NoRecord/NoRecord';
import './TableList.scss';
import "../SearchFilter/SearchFilter";
import { setparams,setparams2, resetAll } from './../../../context/actions/general';

import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";



const TableList4 = ({ list, count, isSearch = true, selectedItem, details = {}, modules = [], isLoad = false, type, page, loadMore, sortkey, sortby, handleDetails, handleModuleLink, handleDelete, handleToggle, handlePageChange, handleSelectedAction, handleSearch, handleSorting, clientArray, roleId, groupData, handleGroupID, handleEmail, history }) => {
    const dispatch = useDispatch();
    let addRedirectUrl = '';
    let editRedirectUrl = '';
    let viewRedirectUrl = '';
    let columns = [];
    if (type === 'Diagnosis') { addRedirectUrl = '/add-diagnosis'; editRedirectUrl = '/edit-diagnosis'; viewRedirectUrl = '/view-diagnosis-detail'; columns = CARE_PATH_DIAGNOSIS_LIST_FIELD; };
    const [selected, setSelected] = useState(selectedItem);
    const [selectAll, setSelectedAll] = useState(false);
    const [selectedId, setId] = useState('');
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('Confirm');
    const [modalText, setModalText] = useState('');
    const [totalPage, setTotalPage] = useState(Math.ceil(count / 10));
    const toggle = () => setModal(!modal);
    const handleCheck = async (obj) => {
        obj = JSON.parse(JSON.stringify(obj));
        if (obj === 'all') {
            list = await list.map(item => {
                setSelected(!selectAll ? list.map(item => item) : []);
                handleSelectedAction(!selectAll ? list.map(item => { delete item.description; return item; }) : []);
                item['isChecked'] = selectAll ? false : true;
                return item;
            });
            setSelectedAll(!selectAll);
        }
        else {
            delete obj.description
            const elementsIndex = list.findIndex(element => element._id === obj._id);
            list[elementsIndex] = { ...list[elementsIndex], isChecked: !list[elementsIndex].isChecked };
            let select = [...selected];
            if (select && select.length) {
                const index = select.findIndex(el => el._id === obj._id);
                if (index === -1) select.push(obj);
                else select.splice(index, 1);
            } else select.push(obj);
            handleSelectedAction(select);
            setSelected(select);
        }
    }

    const _handleSelectedAction = (key, selected) => {
        setSelected([]);
        setSelectedAll(false);
        handleSelectedAction(key, selected);
    }

    // Handle Delete confirm 
    const isConform = async (resp) => {
        setModal(!modal);
        if (resp === 'ok') handleDelete(selectedId)
    }

    const handeViewMode = (rid) => {
        dispatch(setparams2(rid));
        history.push(viewRedirectUrl+'?redir='+history.location.pathname);
    }
    const decodeDesc = (description) => {
        let content = EditorState.createWithContent(ContentState.createFromBlockArray(description['en'] ? htmlToDraft(description['en'].split('"').join("")).contentBlocks : htmlToDraft("--"))).getCurrentContent().getPlainText()
        return content.length > 35 ? `${content.substring(0, 35)}...` : content;
    }
    // let AnswerTypeList = true
    return (
        <>
            <div className="tableWrapper">
                <Row>
                    <Col>
                        <Card small className="mb-4 question-table-header">
                            <CardHeader className="border-bottom tblListHeader d-flex flex-wrap align-items-center">
                                {isSearch && <div className="tblListHeader-col d-flex align-items-center flex-fill pr-3">
                                    <SearchFilter makeSearch={(key) => handleSearch(key)} />
                                </div>}

                            </CardHeader>
                            <CardBody className="p-0">
                                {list && list.length ? null :
                                    <NoRecord />
                                }
                                {list && list.length ?
                                    <div className="pathway-table pathway-header-fixed">
                                        <div className="table-responsive">
                                            <table className="table mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th scope="col" className="border-0" width="12px">
                                                            <FormCheckbox
                                                                className="mb-0"
                                                                checked={list.length === selected.length}
                                                                onChange={() => handleCheck('all')}
                                                            >
                                                            </FormCheckbox>
                                                        </th>

                                                        {columns.map((column, i) => {
                                                            return (
                                                                <th key={i} scope="col" className="border-0">
                                                                    {!column.isSort ?
                                                                        <button className="border-0 d-block bg-transparent p-0"
                                                                            onClick={() => {
                                                                                (column.key === sortkey && sortby === -1)
                                                                                    ? handleSorting(column.key, 1) :
                                                                                    handleSorting(column.key, -1)
                                                                            }} >
                                                                            {column.label}
                                                                            {(column.key === sortkey && sortby === -1) ?
                                                                                <i className="material-icons">keyboard_arrow_down</i> : <i className="material-icons">keyboard_arrow_up</i>}
                                                                        </button>
                                                                        : <button className="border-0 d-block bg-transparent p-0" >
                                                                            {column.label}
                                                                        </button>}
                                                                </th>
                                                            )
                                                        })}
                                                        <th scope="col" className="border-0" width="125px">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td key={i}>
                                                                    <FormCheckbox
                                                                        checked={selectedItem.findIndex(el => el._id === item._id) !== -1 ? true : false}
                                                                        onChange={() => handleCheck(item)}
                                                                    >
                                                                    </FormCheckbox>
                                                                </td>
                                                                {/* Questionnaire Listing */}
                                                                {type === 'Diagnosis' && CARE_PATH_DIAGNOSIS_LIST_FIELD.map((field, key) => {
                                                                    return (<>
                                                                        {item && <td key={key}>{
                                                                            field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'description' ? decodeDesc(item[field.key]) : item[field.key]['en'] && item[field.key]['en'].length > 35 ? `${item[field.key]['en'].substring(0, 35)}...` : item[field.key]['en']
                                                                }</td>}</>)
                                                                })}
                                                                <td>
                                                                    <Button theme="link" className="viewBtn listACtionBtn" onClick={() => handeViewMode(item._id)} title="View Record">
                                                                        <i className="material-icons">visibility</i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : ''}
                            </CardBody>
                            {isLoad && (totalPage > page) && < Button theme="accent" onClick={() => loadMore(page + 1)} >load more</Button>}
                        </Card>
                    </Col>
                </Row>
            </div>
            {/* Model Component to handle delete check */}
            <Modal isOpen={modal} toggle={toggle} className={`confirmModal ${modalType == 'Details' ? 'modalModuleList' : ''}`}>
                <ModalHeader toggle={toggle}>{modalType}</ModalHeader>
                <ModalBody className={modalType == 'Details' ? 'p-0' : ''}>
                    {modalType == 'Confirm' && <ConfirmBlock confirm={(resp) => isConform(resp)} remove={modalText ? modalText : 'delete'} />}
                    {modalType == 'Details' && <DetailsModal details={details} modules={modules} handleModuleLink={handleModuleLink} />}
                </ModalBody>
            </Modal>
        </>
    );
};
export default TableList4;
