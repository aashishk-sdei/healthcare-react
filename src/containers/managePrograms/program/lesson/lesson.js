import React from "react";
import { Row, Col } from "shards-react";
import PageHeader from '../../../../components/common/PageHeader/PageHeader';
import LessonBlock from './lessonBlock/lessonBlock';
const Lesson = ({ match, history }) => {
    let details = match.params.id ? { '@rid': '#21:1', 'categoryName': 'Category1', 'parentCategory': 'Parent Category1' } : undefined;
    const isView = match.path.includes("view");
    const isAdd = (match.path.includes("view") || match.path.includes("edit"));
    return (
        <>
            <PageHeader button={true} buttonLabel='Done' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/add-program')} title={'Add Lessons'} />
            <Row>
                <Col sm="12">
                    <div className="mb-4 card card-small p-3">
                        <LessonBlock details={details} editable={!isView} cancel={() => history.push('/program-list')} history={history} />
                    </div>
                </Col>
            </Row>
        </>
    )
};

export default Lesson;
