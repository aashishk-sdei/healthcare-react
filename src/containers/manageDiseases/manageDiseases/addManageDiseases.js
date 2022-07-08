import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ManageDiseasesForm from "../components/manageDiseasesForm";
import { get_language } from '../../../context/actions/questionnaire';
import { create_disease, update_disease, list_disease_for_select } from '../../../context/actions/manageDisease';
import { pagination } from '../../../utils/constants';
const AddManageDiseases = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
    dispatch(get_language({}));
    dispatch(list_disease_for_select({ limit: pagination.maxlimit, page: 1 }));
  }, []);

  let details = useSelector(state => state.disease.records && isAdd && state.general.param1 && state.general.param1 != '' && state.disease.records.find(item => item['@rid'] === state.general.param1));
  let languageList = useSelector(state => state.general.language) || [];

  let categoryList = useSelector(state => state.disease.recordsForSelect);

  let [childCategories] = useState([]);

  if (details) {
    // ================== Multiple Child Filter Start ======================
    if (typeof (childCategories[details]) === "undefined") {
      childCategories.push(details);
    }
    // Recursive Function To filter out multiple child modules
    const filterMultipleChild = async (id, categories) => {
      let records = await categories.filter(obj => parseInt(obj.parent_id) === id)
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
    categoryList = categoryList.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } });
  }

  categoryList.splice(0, 0, { "id": "0", name: "Parent Category" });

  let filteredCategories = []
  if (categoryList) {
    categoryList && categoryList.length && categoryList.forEach(element => {
      filteredCategories.push({ id: element['id'], name: element.name });
    });
  }


  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_disease(data, result => {
        if (result.messageID === 200) {
          history.push('/manage-diseases-list');
        }
      }));
    } else {
      dispatch(create_disease(data, result => {
        if (result.messageID === 200) history.push('/manage-diseases-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/manage-diseases-list')} title={details ? isView ? 'Manage Disease' : 'Edit Manage Disease' : 'Add Manage Disease'} />
      <Row>
        <Col lg="12">
          <ManageDiseasesForm title="Manage Disease Information" details={details} languageList={languageList} parentList={filteredCategories} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/manage-diseases-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddManageDiseases;
