import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, FormCheckbox, CardHeader, CardFooter, Button, Badge } from "shards-react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import SearchFilter from '../SearchFilter/SearchFilter';
import DropdownCell from "../DropdownCell/DropdownCell";
import PageHeader from '../PageHeader/PageHeader';
import ConfirmBlock from './../Modal/ConfirmBlock/ConfirmBlock';
import Lesson from './../Modal/Lesson/Lesson';
import DetailsModal from './../Modal/DetailsModal/DetailsModal';
import QuestionnaireModal from './../Modal/Questionnaire/Questionnaire';
import { LESSON_LIST_FIELD, ASSIGNED_QUESTIONNAIRE_LIST_FIELD, QUESTIONNAIRE_LIST_FIELD } 
from './../../../utils/constants';
import NoRecord from '../NoRecord/NoRecord';
import Heading4 from './../../../components/common/Heading4/Heading4';
import './TableList2.scss';
import "../SearchFilter/SearchFilter";
import { setparams, setparams2 } from './../../../context/actions/general';



const TableList2 = ({ list, lession, details = {}, modules = [], type,
  finalArray =[], sortkey, sortby, programId, view, handleModuleLink,click, handleDelete, handleToggle, handleSelectedAction, lessonListing, handleSearch, handleSorting, handleSubmit, history }) => {
  const dispatch = useDispatch();
//console.log(list,"+pppppp====list")
  const listingType = `${type} List`;
  let addRedirectUrl = '';
  let editRedirectUrl = '';
  let viewRedirectUrl = '';
  let columns = [];
  if (type === 'Lesson') { addRedirectUrl = '/add-lesson';
   editRedirectUrl = '/edit-lesson'; viewRedirectUrl = '/view-lesson'; 
   columns = LESSON_LIST_FIELD; };
  if (type === 'Assigned Questionnaire') { addRedirectUrl = '/add-asigned-questionnaire'; editRedirectUrl = '/edit-asigned-questionnaire'; viewRedirectUrl = '/view-asigned-questionnaire'; columns = ASSIGNED_QUESTIONNAIRE_LIST_FIELD; }

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectedAll] = useState(false);
  const [selectedId, setId] = useState('');
  const [data, setData] = useState();
  const [dataValue,setDataValue] = useState();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('Confirm');
  const [modalText, setModalText] = useState('');
  const toggle = () => setModal(!modal);

  const handleCheck = async (id) => {
    if (id === 'all') {
      list = await list.map(item => {
        setSelected(!selectAll ? list.map(item => item['@rid']) : []);
        item['isChecked'] = selectAll ? false : true;
        return item;
      });
      setSelectedAll(!selectAll);
    }
    else {
     // console.log(list,"====list")
      const elementsIndex = list.findIndex(element => element['@rid'] === id);
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

  const _handleSelectedAction = (key, selected) => {
    setSelected([]);
    setSelectedAll(false);
    handleSelectedAction(key, selected);
  }

  const handleQuestionnaireDetails = (val) => {
    setModalType('Questionnaire');
    setModal(true);
    setData(val);
  }
  const handleMode = (data)=>{
    setDataValue(data)
    //console.log(data,"data======")
  }

  // Handle Delete confirm 
  const isConform = async (resp) => {
    setModal(!modal);
    if (resp === 'ok') click(selectedId)
  }
  const isConform2 = async (resp) => {
    setModal(!modal);
    if (resp === 'ok') click(selectedId)
  }
  const handeEditMode = (rid) => {
    programId !== '' && dispatch(setparams(programId));
    dispatch(setparams2(rid));
    history.push(editRedirectUrl);
  }

  const handleAssignQuestions = (rid) => {
    programId !== '' && dispatch(setparams(programId));
    dispatch(setparams2(rid));
    history.push(`/assigned-questionnaire`);
  }
  // let AnswerTypeList = true
  return (
    <>
      <div className={`tableWrapper ${lessonListing ? 'lessionTable' : ''}`}>
        {lessonListing ? null : <PageHeader title={listingType} />}
        <Row>
          <Col>
            {lessonListing ? <Heading4 className="p-0 tblTtitle">Lesson Listing</Heading4> : null}
            <Card small className={`mb-0 ${lessonListing ? 'shadow-none' : ''}`}>
              <CardHeader className={`tblListHeader d-flex flex-wrap align-items-center 
              ${lessonListing ? 'border-0' : 'border-bottom'}
              ${lessonListing && selected && selected.length ? 'border-bottom' : 'border-0'}`}>
                <div className="tblListHeader-col d-flex align-items-center flex-fill pr-3">
                  {lessonListing ? null : (type !== 'Assigned Questionnaire' && <SearchFilter makeSearch={(key) => handleSearch(key)} />)}
                  {selected && selected.length ? <DropdownCell className="downDirection" direction="down" handleAction={(key) => _handleSelectedAction(key, selected)} /> : ''}
                </div>
                {lessonListing ? null :
                  (type === 'Assigned Questionnaire' && 
                  <Button theme="link" onClick={() =>
                   { programId && dispatch(setparams(programId)); history.push('/edit-program') }} className="listHeaderBtnWrapper">
                    <Button pill theme="primary" className="listHeaderBtn ml-auto"><i className="material-icons">keyboard_arrow_left</i>Back</Button>
                  </Button>)}
              </CardHeader>
              <CardBody className={`p-0  ${lessonListing ? 'cardBodyLesson shadow-none' : ''}`}>
                {list && list.length ? null : <NoRecord />}
                {list && list.length ?
                  <div className={`table-responsive ${selected && selected.length ? 'filterBtnActive' : ''}`}>
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          {type !== 'Assigned Questionnaire' && <th scope="col" className="border-0" width="12px">
                            <FormCheckbox
                              className="mb-0"
                              checked={list.length === selected.length}
                              onChange={() => !view && handleCheck('all')}
                            >
                            </FormCheckbox>
                          </th>}
                          {/* <th>
                          &nbsp;
                        </th> */}
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
                          <th scope="col" className="border-0" >{type !== 'Assigned Questionnaire' ? 'Status' : 'Questionnaire Hide '}</th>
                          {type !== 'Assigned Questionnaire' && <th scope="col" className="border-0" width="125px">Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, i) => {
                          //Parse the array from string  into array
                          var videos = JSON.parse(item.videos)
                          var rewards = JSON.parse(item.rewards)
                          var questionnaires = JSON.parse(item.questionnaires)
                          var contentPages = JSON.parse(item.contentPages)
                          //Merge all the array in one array for sorting on the randk based 
                          finalArray = [...videos, ...contentPages, ...questionnaires, ...rewards]
                         //sorting the rank 
                          finalArray.sort((a, b) => a.rank - b.rank);
                          return (
                            <tr key={i}>
                              {type !== 'Assigned Questionnaire' && <td>
                                <FormCheckbox
                                  checked={selected.includes(item['@rid']) ? true : false}
                                  onChange={() => !view && handleCheck(item['@rid'])}
                                >
                                </FormCheckbox>
                              </td>}

                              {/* Lesson Listing */}
                              {type === 'Lesson' && LESSON_LIST_FIELD.map((field, key) => {
                                
                                return (
                                  
                                  <td key={key}>
                                    
                                    {field.key === 'assignedQuestionnaire'  ? 
                                    field.key === 'createdAt' ?
                                     moment(item[field.key]).format("MM/DD/YYYY") :
                                      <Button theme="link" 
                                      onClick={e => (Number(item[field.key]) === 0 || view) ? e.preventDefault() : handleAssignQuestions(item['@rid'])} className="position-relative">
                                        Assigned Questionnaire
                                          <Badge pill theme="danger"
                                           className="position-absolute
                                            questionnaireCount d-inline-flex 
                                            align-items-center justify-content-center">
                                              {item[field.key]}</Badge>
                                      </Button> : item[field.key]}
                                  </td>
                                )
                              })}

                              {/* AssignedQuestionnaire Listing */}
                              {type === 'Assigned Questionnaire' && ASSIGNED_QUESTIONNAIRE_LIST_FIELD.map((field, key) => {
                                return (
                                  <td key={key}>
                                    {field.key === 'lessonName' ? lession : field.key === 'questionnaire' ? item[field.key] : item[field.key]}</td>
                                )
                              })}

                              <td>
                                {type !== 'Assigned Questionnaire' ? <div className="custom-control custom-switch listSwitch-cell">
                                  <input type="checkbox" className="custom-control-input" id={`customSwitch${i}`} checked={item.status === 1 ? true : false} onChange={($event) => !view && handleToggle($event.target.checked, item['@rid'])} />
                                  <label className="custom-control-label" htmlFor={`customSwitch${i}`}></label>
                                </div> :
                                  <Button theme="link" className="listACtionBtn">
                                    <i className="material-icons"
                                     onClick={() => handleQuestionnaireDetails(item)}>
                                       Settings</i>
                                  </Button>
                                }
                              </td>

                              {type !== 'Assigned Questionnaire' && <td>
                                <Button theme="link"
                                 className="editBtn listACtionBtn"
                                 onClick={e => { view ? e.preventDefault(e) :
                                  handeEditMode(item['@rid']) }}>
                                  <i className="material-icons listACtionBtn">edit</i>
                                </Button>
                                {/**<Button theme="Link" className="lsitACtionBtn"
                                onClick={() =>
                                  { !view && setSelected([]); !view && 
                                    setId(item['@rid']);
                                   !view && setModalType('Open');
                                    !view && setModal(true) }} 
                                >
                                  hello
                                  </Button>**/}
                                <Button theme="link" 
                                className="viewBtn listACtionBtn" 
                                onClick={() =>
                                  
                                  { !view && setSelected(finalArray); !view && 
                                    setId(finalArray);
                                   !view && setModalType('Open');
                                   !view &&  
                                   handleMode(finalArray)
                                    !view && setModal(true) }} 
                                >
                                    <i className="material-icons">visibility</i>
                                  </Button>
                                <Button theme="link" className="listACtionBtn">
                                  <i className="material-icons"
                                   onClick={() =>
                                    { !view && setSelected([]);
                                       !view && setId(item['@rid']);
                                     !view && setModalType('Confirm');
                                      !view && setModal(true) }} > delete_outline</i>
                                </Button>
                              </td>}
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
                    <DropdownCell direction="up" DropdownMenuRight={false}
                     handleAction={(key) => _handleSelectedAction(key, selected)} />
                  </div>
                  : ''}
              </CardFooter> : ''}
            </Card>
          </Col>
        </Row>
      </div>
      {/* Model Component to handle delete check */}
      <Modal isOpen={modal} toggle={toggle} className={`confirmModal 
      ${modalType === 'Details' ? 'modalModuleList' : 
      modalType === 'Questionnaire' ? 'Questionnaire'  :
      modalType === 'Open' ? 'Open' : ''}
      `}>
        <ModalHeader toggle={toggle}>{modalType}</ModalHeader>
        <ModalBody className={modalType == 'Details' ? 'p-0' : ''}>
          {modalType == 'Confirm' && <ConfirmBlock 
          confirm={(resp) => isConform(resp)} 
          remove={modalText ? modalText : 'delete'} />}
          {modalType == 'Open' && <Lesson 
          confirm= 
          "ok"
           remove={modalText ? modalText : 'Open'} 
          dataSendValue ={dataValue}

           />}
          {modalType == 'Details' && <DetailsModal 
          details={details} modules={modules} 
          handleModuleLink={handleModuleLink} />}
          {modalType == 'Questionnaire' && data && 
          <QuestionnaireModal modal={modal} data={data} submit={(values) => { handleSubmit({ lesson_id: '', lesson_name: lession,
           questionnaire_id: data.rid, questionnaire_name: data.questionnaireName, 
           assignQuestion: values }); setModal(false) }} cancel={() => toggle()} />}
        </ModalBody>
      </Modal>
    </>
  );
};
export default TableList2;
