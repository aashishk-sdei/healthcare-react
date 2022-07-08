import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from "shards-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import SearchFilter from '../SearchFilter/SearchFilter';
import PageHeader from '../PageHeader/PageHeader';
import RangeDatePicker from "../RangeDatePicker";

import {
  pagination, AUDIT_LOG_LIST_FIELD
} from './../../../utils/constants';
import NoRecord from '../NoRecord/NoRecord';
import './TableList.scss';
import "../SearchFilter/SearchFilter";

const AuditLogListTable = ({ list, exportData, headers, count, type, page, sortkey, sortby, handlePageChange, handleSearch, handleSorting, handleCSVDownload, history }) => {
  
  let columns = AUDIT_LOG_LIST_FIELD, filename = `audit_logs_${new Date().getTime()}.csv`;
  const PER_PAGE = pagination.limit, TOTAL_COUNT = count;
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'months').format('MM/DD/YYYY'));
  const [endDate, setEndDate] = useState(moment().format('MM/DD/YYYY'));

  const _handleDownload = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  }

  const exportModalToggle = () => {
    setModal(!modal);
  }

  const exportAuditLogs = async (...args) => {
    await handleCSVDownload({startDate: moment(new Date(args[0])).format('YYYY-MM-DD'), endDate: moment(new Date(args[1])).format('YYYY-MM-DD')});
  }

  const props = {
    currentDate: startDate,
    oneMonthBack: endDate
  };

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  
  return (
    <div className="tableWrapper">
      <PageHeader title={type} />
      <Row>
        <Col>
          <Card small className="mb-4 question-table-header">
            <CardHeader className="border-bottom tblListHeader d-flex flex-wrap align-items-center">
              <div className="tblListHeader-col d-flex align-items-center flex-fill pr-3">
                <SearchFilter makeSearch={(key) => handleSearch(key)} />
              </div>
              <Button pill theme="primary" className="listHeaderBtn ml-auto" onClick={() => setModal(!modal)}>
                Export
              </Button>
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
                        {columns.map((column, i) => {
                          return (
                            <th key={i} scope="col" className="border-0">
                              {!column.isSort ?
                                <button className="border-0 d-block bg-transparent p-0"
                                  onClick={() => { (column.key === sortkey && sortby === -1) ? handleSorting(column.key, 1) : handleSorting(column.key, -1) }}>{column.label}
                                  {(column.key === sortkey && sortby === -1) ?
                                    <i className="material-icons">keyboard_arrow_down</i> : <i className="material-icons">keyboard_arrow_up</i>}
                                </button>
                                : <button className="border-0 d-block bg-transparent p-0" >
                                  {column.label}
                                </button>}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, i) => {
                        return (
                          <tr key={i}>
                            {columns.map((field, key) => {
                              return (
                                <td key={key} title={item[field.key]}>{
                                  field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key] ? item[field.key]: `-`
                                }</td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                : ''}
            </CardBody>
            { list && list.length ? 
              <CardFooter className="tableFooter d-flex align-items-center">  
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
                  onChange={(activePage) => { handlePageChange(activePage) }}
                />
              </CardFooter> : ''
            }
          </Card>
        </Col>
      </Row>
      {/* Export Audit Trail Log Modal */}
      <Modal isOpen={modal} toggle={exportModalToggle}>
        <ModalHeader toggle={exportModalToggle}>Export Audit Logs</ModalHeader>
        <ModalBody>
          <RangeDatePicker handleDownload={(dates) => _handleDownload(dates)} {...props}/>
        </ModalBody>
        <ModalFooter>
          <CSVLink className="listHeaderBtnWrapper" data={exportData} headers={headers} style={{ textDecoration: 'none' }} filename={filename} onClick={() => exportAuditLogs(startDate, endDate)}>
            <Button pill theme="primary" className="listHeaderBtn ml-auto">
              <i className="material-icons">arrow_downward</i>Download
            </Button>
          </CSVLink>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AuditLogListTable;
