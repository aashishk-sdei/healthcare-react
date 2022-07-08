import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import CarePathwayForm from "../components/addCarePathwaysForm";
import { update_care_path, create_care_path, serach_diagnosis, serach_diagnosis_view} from '../../../context/actions/carePathway';
import { pagination, sorting } from '../../../utils/constants';
const AddCarePathway = ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
        dispatch(serach_diagnosis({ limit: pagination.limit, page: 1 }));
        dispatch(serach_diagnosis_view({ limit: pagination.limit, page: 1 }));
    }, []);

    let details = useSelector(state => state.carepath.records && isAdd && state.general.param1 && state.general.param1 != '' && state.carepath.records.find(item => item['@rid']  === state.general.param1));
    let genaderList = [{ key: "Male", value: "Male" }, { key: "Female", value: "Female" }, { key: "Both", value: "Both" }];
    let ageList = [{ key: "Adult", value: "Adult" }, { key: "Child", value: "Child" }];
    let diagnosis = useSelector(state => state.carepath.diagnosis);
    const _submitData = async (data) => {
        if (data['recordId'] && data['recordId'] !== '') {
            dispatch(update_care_path(data, result => {
                if (result.messageID === 200) {
                    history.push('/care-path-list');
                }
            }));
        } else {
            dispatch(create_care_path(data, result => {
                if (result.messageID === 200) history.push('/care-path-list');
            }));
        }
    }


    const _handleSearch = async (keyword) => {
        dispatch(serach_diagnosis({ search: keyword, limit: pagination.maxlimit, page: 1 }));
        dispatch(serach_diagnosis_view({ search: keyword, limit: pagination.maxlimit, page: 1 }));
    }

    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/care-path-list')} title={details ? isView ? 'Care Pathway' : 'Edit Care Pathway' : 'Add Care Pathway'} />
            <Row>
                <Col lg="12">
                    <CarePathwayForm details={details} editable={!isView} _history={history} diagnosis={diagnosis} handleSearch={(val) => _handleSearch(val)} submitData={(val) => _submitData(val)} genaderList={genaderList} ageList={ageList} cancel={() => history.push('/care-path-list')} />
                </Col>
            </Row>
        </>
    )
};
export default AddCarePathway;
