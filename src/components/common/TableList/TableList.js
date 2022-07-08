import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, FormCheckbox, CardHeader, CardFooter, Button, FormInput } from "shards-react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import SearchFilter from '../SearchFilter/SearchFilter';
import { SelectBox } from '../FormsInput';
import DropdownCell from "../DropdownCell/DropdownCell";
import PageHeader from '../PageHeader/PageHeader';
import ConfirmBlock from './../Modal/ConfirmBlock/ConfirmBlock';
import DetailsModal from './../Modal/DetailsModal/DetailsModal';
import MassEmailModal from './../Modal/massEmail/massmail';
import {
  pagination, AssetsIconType, GROUP_TYPE_FIELDS, USER_TYPE_FIELDS, GROUP_FIELDS, CENSUS_LIST_FIELD, CLIENT_FIELDS, ICD_FIELDS, LANGUAGE_LIST_FIELD, LABEL_LIST_FIELD, MasterModule_FIELDS, PROBLEM_LIST_FIELD, MANAGE_VIEW_FIELDS, CARE_PATH_LIST_FIELD, ICD_CATEGORIESS_FIELDS, DIAGNOSIS_LIST_FIELD, QUESTION_CATEGORIESS_LIST_FIELDS, MANAGE_DISEASES_LIST_FIELDS, MANAGE_SURVEY_LIST_FIELD, QUESTION_LIST_FIELD, QUESTIONNAIRE_LIST_FIELD, STAFF_FIELDS, PROGRAM_TYPE_LIST_FIELD, PROGRAM_LIST_FIELD, KNOWLEDGE_CATEGORY_LIST_FIELD, EMAIL_TYPE_LIST_FIELD, EMAIL_TEMPLATE_LIST_FIELD, KNOWLEDGE_LIST_FIELD, GOAL_LIST_FIELD, INTERVENTION_LIST_FIELD, CONTENT_PAGE_LIST_FIELD
} from './../../../utils/constants';
import NoRecord from '../NoRecord/NoRecord';
import './TableList.scss';
import "../SearchFilter/SearchFilter";
import { setparams, setparams2, setFilterParams } from './../../../context/actions/general';


const TableList = ({ list, count, diagnosis, problem, goal, diagnosisFilter, problemFilter, advanceSearch, goalFilter, filterDia = false, filterProb = false, filterGoal = false, details = {}, modules = [], type, page, sortkey, sortby, handleDetails, handleModuleLink, handleDelete, handleToggle, handlePageChange, handleSelectedAction, handleSearch, handleSorting, clientArray, handleEmail, history, contentPageNote, clearFilter }) => {
  const dispatch = useDispatch();

  const listingType = `${type} List`;
  let addRedirectUrl = '';
  let editRedirectUrl = '';
  let viewRedirectUrl = '';
  let modalTextMulti = '';
  let modalTextSingle = '';
  let columns = [];
  let deleteOption = type === 'Master Module' ? false : true;
  if (type === 'User Type') { addRedirectUrl = '/add-user-type'; editRedirectUrl = '/manage-user-type'; viewRedirectUrl = '/view-user-type'; columns = USER_TYPE_FIELDS };
  if (type === 'Group Type') { addRedirectUrl = '/add-group-type'; editRedirectUrl = '/manage-group-type'; viewRedirectUrl = '/view-group-type'; columns = GROUP_TYPE_FIELDS };
  if (type === 'Group') { addRedirectUrl = '/add-group'; editRedirectUrl = '/manage-group'; viewRedirectUrl = '/view-group'; columns = GROUP_FIELDS; };
  if (type === 'Client') { addRedirectUrl = '/add-client'; editRedirectUrl = '/manage-client'; viewRedirectUrl = '/view-client'; columns = CLIENT_FIELDS };
  if (type === 'ICD') { addRedirectUrl = '/add-icd'; editRedirectUrl = '/manage-icd'; viewRedirectUrl = '/view-icd'; columns = ICD_FIELDS; };
  if (type === 'Staff') { addRedirectUrl = '/add-staff'; editRedirectUrl = '/manage-staff'; viewRedirectUrl = '/view-staff'; columns = STAFF_FIELDS };
  if (type === 'Master Module') { addRedirectUrl = '/add-master-module'; editRedirectUrl = '/manage-master-module'; viewRedirectUrl = '/view-master-module'; columns = MasterModule_FIELDS; };
  if (type === 'Manage View') { modalTextMulti = 'delete the Category? Deleting the category will delete all sub-categories'; modalTextSingle = ' delete the category'; addRedirectUrl = '/add-view'; editRedirectUrl = '/manage-view'; viewRedirectUrl = '/views'; columns = MANAGE_VIEW_FIELDS; };
  if (type === 'ICD Category') { addRedirectUrl = '/add-icd-categories'; editRedirectUrl = '/edit-icd-categories'; viewRedirectUrl = '/view-icd-categories'; columns = ICD_CATEGORIESS_FIELDS; };
  if (type === 'Question Category') { modalTextMulti = 'delete the Category? Deleting the category will delete all sub-categories'; modalTextSingle = ' delete the category'; addRedirectUrl = '/add-question-categories'; editRedirectUrl = '/edit-question-categories'; viewRedirectUrl = '/view-question-categories'; columns = QUESTION_CATEGORIESS_LIST_FIELDS; };
  if (type === 'Manage Disease') { modalTextMulti = 'delete the Disease? Deleting the disease will delete all sub-diseases'; modalTextSingle = ' delete the disease'; addRedirectUrl = '/add-manage-diseases'; editRedirectUrl = '/edit-manage-diseases'; viewRedirectUrl = '/view-manage-diseases'; columns = MANAGE_DISEASES_LIST_FIELDS; };
  if (type === 'Survey Category') { modalTextMulti = 'delete the Category? Deleting the category will delete all sub-categories'; modalTextSingle = ' delete the category'; addRedirectUrl = '/add-survey-category'; editRedirectUrl = '/edit-survey-category'; viewRedirectUrl = '/view-survey-category'; columns = MANAGE_SURVEY_LIST_FIELD; };
  if (type === 'Question') { addRedirectUrl = '/add-question'; editRedirectUrl = '/edit-question'; viewRedirectUrl = '/view-question'; columns = QUESTION_LIST_FIELD; };
  if (type === 'Questionnaire') { addRedirectUrl = '/add-questionnaire'; editRedirectUrl = '/edit-questionnaire'; viewRedirectUrl = '/view-questionnaire'; columns = QUESTIONNAIRE_LIST_FIELD; };
  if (type === 'Program Type') { addRedirectUrl = '/add-program-type'; editRedirectUrl = '/edit-program-type'; viewRedirectUrl = '/view-program-type'; columns = PROGRAM_TYPE_LIST_FIELD; };
  if (type === 'Knowledge Category') { modalTextMulti = 'delete the Category? Deleting the category will delete all sub-categories'; modalTextSingle = ' delete the category'; addRedirectUrl = '/add-knowledge-category'; editRedirectUrl = '/edit-knowledge-category'; viewRedirectUrl = '/view-knowledge-category'; columns = KNOWLEDGE_CATEGORY_LIST_FIELD; };
  if (type === 'Knowledge Bank') { addRedirectUrl = '/add-knowledge'; editRedirectUrl = '/edit-knowledge'; viewRedirectUrl = '/view-knowledge'; columns = KNOWLEDGE_LIST_FIELD; };
  if (type === 'Email Type') { deleteOption = false; addRedirectUrl = '/add-email-type'; editRedirectUrl = '/edit-email-type'; viewRedirectUrl = '/view-email-type'; columns = EMAIL_TYPE_LIST_FIELD; };
  if (type === 'Email Template') { deleteOption = false; addRedirectUrl = '/add-email-template'; editRedirectUrl = '/edit-email-template'; viewRedirectUrl = '/view-email-template'; columns = EMAIL_TEMPLATE_LIST_FIELD; };
  if (type === 'Program') { addRedirectUrl = '/add-program'; editRedirectUrl = '/edit-program'; viewRedirectUrl = '/view-program'; columns = PROGRAM_LIST_FIELD; };
  if (type === 'Diagnosis') { addRedirectUrl = '/add-diagnosis'; editRedirectUrl = '/edit-diagnosis'; viewRedirectUrl = '/view-detail-diagnosis'; columns = DIAGNOSIS_LIST_FIELD; };
  if (type === 'Care Pathway') { addRedirectUrl = '/add-care-path'; editRedirectUrl = '/edit-care-path'; viewRedirectUrl = '/view-care-path'; columns = CARE_PATH_LIST_FIELD; };
  if (type === 'Language') { addRedirectUrl = '/add-language'; editRedirectUrl = '/edit-language'; viewRedirectUrl = '/view-language'; columns = LANGUAGE_LIST_FIELD; };
  if (type === 'Label') { addRedirectUrl = '/add-label'; editRedirectUrl = '/edit-label'; viewRedirectUrl = '/view-label'; columns = LABEL_LIST_FIELD; };
  if (type === 'Problem') { addRedirectUrl = '/add-problem'; editRedirectUrl = '/edit-problem'; viewRedirectUrl = '/view-problem'; columns = PROBLEM_LIST_FIELD; };
  if (type === 'Goal') { addRedirectUrl = '/add-goal'; editRedirectUrl = '/edit-goal'; viewRedirectUrl = '/view-goal'; columns = GOAL_LIST_FIELD; };
  if (type === 'Intervention') { addRedirectUrl = '/add-intervention'; editRedirectUrl = '/edit-intervention'; viewRedirectUrl = '/view-intervention'; columns = INTERVENTION_LIST_FIELD; };
  if (type === 'Content Page') { addRedirectUrl = '/add-content-page'; editRedirectUrl = '/edit-content-page'; viewRedirectUrl = '/view-content-page'; columns = CONTENT_PAGE_LIST_FIELD; };
  if (type === 'Manage Census') { editRedirectUrl = '/edit-sensus'; addRedirectUrl = '/add-census'; viewRedirectUrl = '/view-census'; columns = CENSUS_LIST_FIELD; };


  const PER_PAGE = pagination.limit, TOTAL_COUNT = count;
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectedAll] = useState(false);
  const [selectedId, setId] = useState('');
  const [modal, setModal] = useState(false);
  const [advanceFilter, setAdvanceFilter] = useState(false);
  const [modalType, setModalType] = useState('Confirm');
  const [modalText, setModalText] = useState('');
  const [recordId, setRecordId] = useState('');
  const toggle = () => setModal(!modal);
  useEffect(() => {
    dispatch(setparams2(''));
    dispatch(setFilterParams(''));
  }, []);
  const handleCheck = async (id) => {
    if (id === 'all') {
      list = await list.map(item => {
        setSelected(!selectAll ? list.map(item => item._id) : []);
        item['isChecked'] = selectAll ? false : true;
        return item;
      });
      setSelectedAll(!selectAll);
    }
    else {
      const elementsIndex = list.findIndex(element => element._id === id);
      list[elementsIndex] = { ...list[elementsIndex], isChecked: !list[elementsIndex].isChecked };
      let select = [...selected];
      if (select && select.length) {
        const index = select.findIndex(rid => rid === id);
        if (index === -1) select.push(id);
        else select.splice(index, 1);
      } else select.push(id);
      setSelected(select);
    }
  }

  if (list.length === selected.length && !selectAll) {
    setSelectedAll(true)
  }
  if (selected.length > 0 && selected.length !== list.length && selectAll) {
    setSelectedAll(false)
  }

  const additionUrl = { goals: "/goal-list", problem: "/problem-list", interventions: "/intervention-list" }

  const jsUcfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  const handleSetting = async (rid) => {
    handleDetails(rid);
    setModal(true);
    setModalType('Details');
  }
  const moveLocation = (rid, url) => {
    dispatch(setFilterParams(rid));
    history.push(url);
  }
  const handeViewMode = (rid) => {
    dispatch(setparams(rid));
    history.push(viewRedirectUrl);
  }
  const handeEditMode = (rid) => {
    dispatch(setparams(rid));
    history.push(editRedirectUrl);
  }
  const checkField = (item2, field) => {
    if (field.child) {
      return item2[field.key] && item2[field.key][field.child]['en'].length > 35 ? `${item2[field.key][field.child]['en'].substring(0, 35)}...` : item2[field.key][field.child]['en'];
    } else if (typeof item2[field.key] === "string") {
      return item2[field.key] && item2[field.key].length > 35 ? `${item2[field.key].substring(0, 35)}...` : item2[field.key];
    } else {
      return item2[field.key] && item2[field.key]['en'].length > 35 ? `${item2[field.key]['en'].substring(0, 35)}...` : item2[field.key]['en'];
    }
  }
  return (
    <>
      <div className="tableWrapper">
        <PageHeader title={listingType} />
        <Row>
          <Col>
            <Card small className="mb-4 question-table-header">
              <CardHeader className="border-bottom tblListHeader d-flex flex-wrap align-items-center content-page-header justify-content-between">
                <div className="tblListHeader-col d-flex align-items-center">
                  <SearchFilter makeSearch={(key) => handleSearch(key)} />
                  {selected && selected.length ? <DropdownCell className="downDirection" direction="down" deleteOption={deleteOption} handleAction={(key) => _handleSelectedAction(key, selected)} /> : ''}

                </div>
                {contentPageNote ?
                  <Row className="content-page-note">
                    <Col lg="2" className="note-label"><b>Note:- </b></Col>
                    <Col lg="10" className="note-content">{contentPageNote}</Col>
                  </Row>
                  : null}
                <div className="d-flex">
                  {(filterDia && advanceFilter) && <div className="tblListHeader-col d-flex align-items-center flex-fill2 pr-1 tblListDropdown">
                    <SelectBox Placeholder="Select diagnosis" options={diagnosis} handleVal={e => diagnosisFilter(e)} isRequired={false} />
                  </div>}
                  {(filterProb && advanceFilter) && <div className="tblListHeader-col d-flex align-items-center flex-fill2 pr-1 tblListDropdown">
                    <SelectBox Placeholder="select problem" options={problem} handleVal={e => problemFilter(e)} isRequired={false} />
                  </div>}
                  {(filterGoal && advanceFilter) && <div className="tblListHeader-col d-flex align-items-center flex-fill2 pr-1 tblListDropdown">
                    <SelectBox Placeholder="select goal" options={goal} handleVal={e => goalFilter(e)} isRequired={false} />
                  </div>}
                  {/* <div className="tblListHeader-col d-flex align-items-center flex-fill3 pr-1 tblListDropdown">
                  <i className="material-icons text-danger">close</i>
                </div> */}
                  {type === 'Client' ? <CSVLink className="listHeaderBtnWrapper" data={clientArray} style={{ textDecoration: 'none' }} filename={'client.csv'} target="_blank">
                    <Button pill theme="primary" className="listHeaderBtn ml-auto">
                      <i className="material-icons">arrow_downward</i>Export
                  </Button></CSVLink> : ''}
                  {advanceFilter && advanceSearch && <Button pill theme="danger" onClick={val => { clearFilter(); setAdvanceFilter(false) }} className="listHeaderBtn ml-auto">
                    Clear
                  </Button>}
                  {!advanceFilter && advanceSearch && <Button pill theme="primary" onClick={val => { setAdvanceFilter(true) }} className="listHeaderBtn ml-auto">
                    Advance Filter
                  </Button>}
                  <Link to={addRedirectUrl} className="listHeaderBtnWrapper">
                    {type !== 'Manage Census' && <Button pill theme="primary" className="listHeaderBtn ml-auto">
                      <i className="material-icons">add</i>Add {type}
                    </Button>
                    }
                    {type === 'Manage Census' && <Button pill theme="primary" className="listHeaderBtn ml-auto">
                      <i className="material-icons">add</i>Upload CSV Template
                    </Button>
                    }
                  </Link>

                </div>
              </CardHeader>
              <CardBody className="p-0">
                {list && list.length ? null :
                  <NoRecord />
                }
                {list && list.length ?
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
                          {/* <th>
                          &nbsp;
                        </th> */}
                          {columns.map((column, i) => {
                            return (
                              <th key={i} scope="col" className={"border-0 " + (column.label === 'Colour' ? " text-center" : "")}>
                                {!column.isSort ?
                                  <button className="border-0 d-block bg-transparent p-0"
                                    onClick={() => { (column.key === sortkey && sortby === -1) ? handleSorting(column.key, 1) : handleSorting(column.key, -1) }}>{column.label}
                                    {(column.key === sortkey && sortby === -1) ?
                                      <i className="material-icons">keyboard_arrow_down</i> : <i className="material-icons">keyboard_arrow_up</i>}
                                  </button>
                                  :
                                  column.label === 'Colour' ?
                                    column.label
                                    : <button className="border-0 d-block bg-transparent p-0" >
                                      {column.label}
                                    </button>}

                              </th>
                            )
                          })}
                          <th scope="col" className="border-0" >Status</th>
                          <th scope="col" className="border-0" width="125px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td key={i}><FormCheckbox checked={selected.includes(item._id) ? true : false} onChange={() => handleCheck(item._id)}></FormCheckbox></td>
                              {/* Users Listing */}
                              {type === 'User Type' && USER_TYPE_FIELDS.map((field, key) => {
                                return (
                                  <td key={key}>{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}
                              {/* Group Type Listing */}
                              {type === 'Group Type' && GROUP_TYPE_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Group Listing */}
                              {type === 'Group' && GROUP_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} className={field.key === 'groupContactEmail' ? 'texttransformnone' : ''}>{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'groupContactName' && item[field.key].length > 20 ? `${item['groupContactTitle']} ${item[field.key].substring(0, 20)}...` : (item[field.key].length > 20 ? `${item[field.key].substring(0, 20)}...` : item[field.key])
                                  }</td>
                                )
                              })}

                              {/* ICD Listing */}
                              {type === 'ICD' && ICD_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : checkField(item, field)
                                  }</td>)
                              })}
                              {/* MasterModule Listing */}
                              {type === 'Master Module' && MasterModule_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>
                                )
                              })}

                              {/* manageView Listing */}
                              {type === 'Manage View' && MANAGE_VIEW_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>
                                )
                              })}

                              {/* icdCategories Listing */}
                              {type === 'ICD Category' && ICD_CATEGORIESS_FIELDS.map((field, key) => {
                                return (<>
                                  {item[field.key] && <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key]['en'].length > 35 ? `${item[field.key]['en'].substring(0, 35)}...` : item[field.key]['en']
                                  }</td>}</>)
                              })}

                              {/* Question Category Listing */}
                              {type === 'Question Category' && QUESTION_CATEGORIESS_LIST_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} className={field.key === 'colour' ? "text-center" : ""} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'colour' ? <span style={{ backgroundColor: item[field.key], borderRadius: '10px', marginBottom: '0px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : item[field.key] && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Manage Disease Listing */}
                              {type === 'Manage Disease' && MANAGE_DISEASES_LIST_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} className={field.key === 'color_hex' ? "text-center" : ""} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'color_hex' ? <span style={{ backgroundColor: item[field.key], borderRadius: '10px', marginBottom: '0px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}
                              {/* Manage Knowledge Category Listing */}
                              {type === 'Knowledge Category' && KNOWLEDGE_CATEGORY_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}
                              {/* Manage Knowledge Listing */}
                              {type === 'Knowledge Bank' && KNOWLEDGE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` :
                                      field.key === 'assets' ? <div className="col-sm-4 outer-grid-icon"><i className="material-icons">{item[field.key].map(item => AssetsIconType[item])}</i></div> :
                                        item[field.key]
                                  }</td>)
                              })}
                              {/* Manage Knowledge Listing */}
                              {type === 'Email Template' && EMAIL_TEMPLATE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Manage email type */}
                              {type === 'Email Type' && EMAIL_TYPE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Survey Category Listing */}
                              {type === 'Survey Category' && MANAGE_SURVEY_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} className={field.key === 'colour' ? "text-center" : ""} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'colour' ? <span style={{ backgroundColor: item[field.key], borderRadius: '10px', marginBottom: '0px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : item[field.key] && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Question Listing */}
                              {type === 'Question' && QUESTION_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? field.key === 'question' ? jsUcfirst(`${item[field.key].substring(0, 35)}...`) : `${item[field.key].substring(0, 35)}...` : field.key === 'question' ? jsUcfirst(item[field.key]) : item[field.key]
                                  }</td>)
                              })}

                              {/* Questionnaire Listing */}
                              {type === 'Questionnaire' && QUESTIONNAIRE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key] && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* ProgramType Listing */}
                              {type === 'Program Type' && PROGRAM_TYPE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}

                              {/* Program Listing */}
                              {type === 'Program' && PROGRAM_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
                                  }</td>)
                              })}
                              {/* Diagnosis Listing */}
                              {type === 'Diagnosis' && DIAGNOSIS_LIST_FIELD.map((field, key) => {
                                return (<>
                                    {item[field.key] && <td key={key} >{
                                      field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : checkField(item, field)//typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#" onClick={val => moveLocation(item._id, additionUrl[field.key])} >{item[field.key]}</Link>
                                    }</td>}</>)
                              })}
                              {/* Label Listing */}
                              {type === 'Label' && LABEL_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#">{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* problem Listing */}
                              {type === 'Problem' && PROBLEM_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#" onClick={val => moveLocation(item._id, additionUrl[field.key])} >{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* Care Path Listing */}
                              {type === 'Care Pathway' && CARE_PATH_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#">{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* Language Listing */}
                              {type === 'Language' && LANGUAGE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#">{item[field.key]}</Link>
                                  }</td>)
                              })}

                              {/* Client Listing */}
                              {type === 'Client' && CLIENT_FIELDS.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdOn' ? moment(item[field.key]).format("MM/DD/YYYY") :
                                      field.key === 'fullname' && item[field.key].length > 20 ? `${item['title']} ${item[field.key].
                                        substring(0, 20)}...` : (item[field.key].length > 20 ? `${item[field.key].substring(0, 20)}...` :
                                          item[field.key])
                                  }</td>
                                )
                              })}
                              {/* Staff Listing */}
                              {type === 'Staff' && STAFF_FIELDS.map((field, key) => {

                                const fullname = `${item['firstname']} ${item['lastname']}`;
                                return (
                                  <td key={key} className={field.key === 'email' ? 'texttransformnone' : ''}>{
                                    field.key === 'createdOn' ? moment(item[field.key]).format("MM/DD/YYYY") : (field.key === 'firstname') ? fullname.length > 20 ? `${fullname.substring(0, 20)}...` : fullname : item[field.key]}</td>
                                )
                              })}
                              {/* Goal Listing */}
                              {type === 'Goal' && GOAL_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#" onClick={val => moveLocation(item._id, additionUrl[field.key])}>{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* Intervention Listing */}
                              {type === 'Intervention' && INTERVENTION_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} style={{ textTransform: 'none' }}>{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#">{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* Content Page Listing */}
                              {type === 'Content Page' && CONTENT_PAGE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : typeof item[field.key] === 'string' && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : typeof item[field.key] === 'string' ? item[field.key] : <Link className="editBtn listACtionBtn" to="#">{item[field.key]}</Link>
                                  }</td>)
                              })}
                              {/* Manage Census Listing */}
                              {type === 'Manage Census' && CENSUS_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key} >{
                                    field.key === 'createdOn' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key] && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key] ? item[field.key] : '--'
                                  }</td>)
                              })}
                              {type === 'Client' ?
                                <td>
                                  <div className="custom-control custom-switch listSwitch-cell">
                                    <input type="checkbox" 
                                    className="custom-control-input" 
                                    id={`customSwitch${i}`} 
                                    checked={item.isActive === true ? true : false} 
                                    onChange={($event) => 
                                    handleToggle($event.target.checked, item['@rid'])} />
                                    <label className="custom-control-label" 
                                    htmlFor={`customSwitch${i}`}></label>
                                    <input type="checkbox" className="custom-control-input" id={`customSwitch${i}`} checked={item.isActive === true ? true : false} onChange={($event) => handleToggle($event.target.checked, item._id)} />
                                    <label className="custom-control-label" htmlFor={`customSwitch${i}`}></label>
                                  </div>
                                </td> :
                                <td>
                                  <div className="custom-control custom-switch listSwitch-cell">
                                    <input type="checkbox" className="custom-control-input" id={`customSwitch${i}`} checked={item.status === 1 ? true : false} onChange={($event) => handleToggle($event.target.checked, item._id)} />
                                    <label className="custom-control-label" htmlFor={`customSwitch${i}`}></label>
                                  </div>
                                </td>
                              }
                              {type !== 'Master Module' ?
                                <td>
                                  {type === 'Email Template' &&
                                    <Button theme="link" className="listACtionBtn" title="Mass Email">
                                      <i className="material-icons" onClick={() => { setRecordId(item._id); setModalType('Mass Email'); setModal(true) }}>email</i>
                                    </Button>
                                  }
                                  {type === 'Email Template' &&
                                    <Button theme="link" className="listACtionBtn" title="Test Email">
                                      <i className="material-icons" onClick={() => { setRecordId(item._id); setModalType('Test Email'); setModal(true) }}>share</i>
                                    </Button>
                                  }
                                  <Button theme="link" className="viewBtn listACtionBtn" onClick={() => handeViewMode(item._id)} title="View Record">
                                    <i className="material-icons">visibility</i>
                                  </Button>
                                  {type !== "Manage Census" && <Button theme="link" className="editBtn listACtionBtn" onClick={() => handeEditMode(item._id)} title="Edit Record">
                                    <i className="material-icons listACtionBtn">edit</i>
                                  </Button>}

                                  {type !== 'Email Type' && type !== 'Email Template' ? type === 'ICD Category' || type === 'Manage Disease' || type === 'Survey Category' || type === 'Knowledge Category' || type === 'Question Category' ?
                                    <Button theme="link" className="listACtionBtn" title="Delete Record">
                                      <i className="material-icons" onClick={() => { setSelected([]); setId(type === 'ICD Category' ? item : item._id); setModalText(item.parent_id == 0 ? modalTextMulti : modalTextSingle); setModalType('Confirm'); setModal(true) }}>delete_outline</i>
                                    </Button>
                                    : <Button theme="link" className="listACtionBtn" title="Delete Record">
                                      <i className="material-icons" onClick={() => { setSelected([]); setId(item._id); setModalType('Confirm'); setModal(true) }}>delete_outline</i>
                                    </Button> : ''}
                                  {type === 'Group' && <Button theme="link" className="listACtionBtn" title="Setting">
                                    <i className="material-icons" onClick={() => handleSetting(item._id)}>settings</i>
                                  </Button>}
                                </td>
                                :
                                <td> <Button theme="link" className="viewBtn listACtionBtn" onClick={() => handeViewMode(item._id)} title="View Details">
                                  <i className="material-icons">visibility</i>
                                </Button></td>
                              }
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  : ''}
              </CardBody>
              {list && list.length ? <CardFooter className="tableFooter d-flex align-items-center">
                {selected && selected.length ?
                  <div className="tableFooterCol">
                    <DropdownCell direction="up" deleteOption={deleteOption} DropdownMenuRight={false} type={'Master Module'} handleAction={(key) => _handleSelectedAction(key, selected)} />
                  </div>
                  : ''}
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  prevPageText='prev'
                  nextPageText='next'
                  firstPageText='first'
                  lastPageText='last'
                  activePage={page}
                  itemsCountPerPage={PER_PAGE}
                  totalItemsCount={TOTAL_COUNT}
                  onChange={(activePage) => { setSelected([]); handlePageChange(activePage) }}
                />
              </CardFooter> : ''}
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
          {(modalType === 'Mass Email' || modalType === 'Test Email') && <MassEmailModal details={details} template={recordId} type={modalType} submit={(val) => { handleEmail(val); setModal(false) }} cancel={() => { setModal(false) }} />}

        </ModalBody>
      </Modal>
    </>
  );
};
export default TableList;
