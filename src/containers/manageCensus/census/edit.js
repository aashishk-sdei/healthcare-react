import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import EditCensusFrom from "../components/editCensusForm";
import { update_census } from '../../../context/actions/census';
const EditCensus= ({ match, history }) => {

    const dispatch = useDispatch();
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));

    useEffect(() => {
    }, []);

    let details = useSelector(state => state.census.records && isAdd && state.general.param1 && state.general.param1 != '' && state.census.records.find(item => item['@rid'] === state.general.param1));
    const _submitData = async (data) => {
        if (data['recordId'] && data['recordId'] !== '') {
            dispatch(update_census(data, result => {
                if (result.messageID === 200) {
                    history.push('/census-list');
                }
            }));
        } 
    }


    return (
        <>
            <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/census-list')} title={details ? isView ? 'Census' : 'Edit Census' : 'Add Census'} />
            <Row>
                <Col lg="12">
                    <EditCensusFrom details={details} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/census-list')} />
                </Col>
            </Row>
        </>
    )
};
export default EditCensus;