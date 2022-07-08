import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ManageSurveyForm from "../components/manageSurveyForm";
import { create_survey_category, list_survey_categories_for_select, update_survey_category, get_language } from '../../../context/actions/survey';
import { pagination } from '../../../utils/constants';

const AddManageDiseases = ({ match, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_survey_categories_for_select({ limit: pagination.maxlimit, page: 1 }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  let details = useSelector(state => state.survey.records && isAdd && state.general.param1 && state.general.param1 != '' && state.survey.records.find(item => item['@rid'] === state.general.param1));
  let Language = useSelector(state => state.general.language) || [];

  let categoryList = useSelector(state => state.survey.recordsForSelect);

  let [childCategories, setChildCategories] = useState([]);

  if (details) {
    // ================== Multiple Child Filter Start ======================
    if (typeof (childCategories[details]) === "undefined") {
      childCategories.push(details);
    }
    // Recursive Function To filter out multiple child modules
    const filterMultipleChild = async (id, categories) => {
      let records = await categories.filter(obj => parseInt(obj.parentId) === id)
      if (records && records.length) {
        await records.map(async item => {
          if (typeof (childCategories[item]) === "undefined") {
            childCategories.push(item);
          }
          filterMultipleChild(item['id'], categories);
        });
      } else {
        return 1;
      }
    }

    filterMultipleChild(details.id, categoryList);

    let yFilter = childCategories.map(itemY => { return itemY.id; });
    let filteredX = categoryList.filter(itemX => !yFilter.includes(itemX.id));
    categoryList = filteredX;
    // ================== Multiple Child Filter End ======================
  } else {
    categoryList = categoryList.filter(item => { if (item.status == 1) { item['categoryName'] = item['categoryName'].length > 110 ? `${item['categoryName'].substring(0, 110)}...` : item['categoryName']; return item; } });
  }

  categoryList.splice(0, 0, { "id": "0", categoryName: "Parent" });

  let filteredCategories = []
  if (categoryList) {
    categoryList && categoryList.length && categoryList.forEach(element => {
      filteredCategories.push({ id: element['id'], name: element.categoryName });
    });
  }

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_survey_category(data, result => {
        if (result.messageID === 200) {
          history.push('/survey-category-list');
        }
      }));
    } else {
      dispatch(create_survey_category(data, result => {
        if (result.messageID === 200) history.push('/survey-category-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/survey-category-list')} title={details ? isView ? 'Survey Category' : 'Edit Survey Category' : 'Add Survey Category'} />
      <Row>
        <Col lg="12">
          <ManageSurveyForm title="Survey Category Information" details={details} categories={filteredCategories} Language={Language} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/survey-category-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddManageDiseases;
