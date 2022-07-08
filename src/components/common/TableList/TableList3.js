import React, { useState } from "react";
import { Row, Col, Card, CardBody, FormCheckbox } from "shards-react";
import moment from 'moment';
import { pagination, SEARCH_ICD_FIELDS } from './../../../utils/constants';
import NoRecord from '../NoRecord/NoRecord';
import './TableList.scss';
import "../SearchFilter/SearchFilter";

import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";

const TableList3 = ({ list, type, sortkey, sortby, handleSelectedAction, handleSorting, selectedCode }) => {
    let addRedirectUrl = '';
    let editRedirectUrl = '';
    let viewRedirectUrl = '';
    let columns = [];

    if (type === 'ICD') { addRedirectUrl = '/add-icd'; editRedirectUrl = '/manage-icd'; viewRedirectUrl = '/view-icd'; columns = SEARCH_ICD_FIELDS; };
    const [selected, setSelected] = useState(selectedCode.length > 0 ? selectedCode : []);
    const [selectAll, setSelectedAll] = useState(false);
    const handleCheck = async (id) => {
        if (id === 'all') {
            list = await list.map(item => {
                setSelected(!selectAll ? list.map(item => item._id) : []);
                handleSelectedAction(!selectAll ? list.map(item => item._id) : []);
                item['isChecked'] = selectAll ? false : true;
                return item;
            });
            setSelectedAll(!selectAll);
        }
        else {
            debugger;
            const elementsIndex = list.findIndex(element => element._id === id);
            list[elementsIndex] = { ...list[elementsIndex], isChecked: !list[elementsIndex].isChecked };
            let select = [...selected];
            if (select && select.length) {
                const index = select.findIndex(rid => rid === id);
                if (index === -1) select.push(id);
                else select.splice(index, 1);
            } else select.push(id);
            handleSelectedAction(select);
            setSelected(select);
        }

    }
    const decodeDesc = (description) => {
        let content = EditorState.createWithContent(ContentState.createFromBlockArray(description['en'] ? htmlToDraft(description['en'] .split('"').join("")).contentBlocks : htmlToDraft("--"))).getCurrentContent().getPlainText()
        return content.length > 35 ? `${content.substring(0, 35)}...` : content;
    }
    return (
        <>
            <div className="tableWrapper">
                <Row>
                    <Col>
                        <Card small className="mb-4 question-table-header">
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
                                                    {columns.map((column, i) => {
                                                        return (
                                                            <th key={i} scope="col" className="border-0">
                                                                <button className="border-0 d-block bg-transparent p-0" >
                                                                    {column.label}
                                                                </button>
                                                            </th>
                                                        )
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td key={i}>
                                                                <FormCheckbox
                                                                    checked={selected.includes(item._id)}
                                                                    onChange={() => handleCheck(item._id)}
                                                                >
                                                                </FormCheckbox>
                                                            </td>

                                                            {/* ICD Listing */}
                                                            {type === 'ICD' && SEARCH_ICD_FIELDS.map((field, key) => {
                                                                return (
                                                                    <td key={key} >{
                                                                        field.key === 'createdAt' ? moment(item[field.key]).format("MM/DD/YYYY") : field.key === 'description' ? decodeDesc(item[field.key]) : item[field.key] && item[field.key].length > 35 ? `${item[field.key].substring(0, 35)}...` : item[field.key]
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

                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default TableList3;
