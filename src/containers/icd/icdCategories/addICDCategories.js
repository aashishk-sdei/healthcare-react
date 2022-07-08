import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ICDCategoriesForm from "../components/ICDCategoriesForm";
import { create_icd_categories, update_icd_categories, list_icd_categories_for_select } from '../../../context/actions/icdCategories';
import { list_data } from '../../../context/actions/language';
import { pagination } from './../../../utils/constants';
const AddICDCategories = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
    dispatch(list_icd_categories_for_select({ limit: pagination.maxlimit, page: 1 }));
    dispatch(list_data({ limit: pagination.maxlimit, page: 1 }));
  }, []);
  let details = useSelector(state => state.icdCategory.records && isAdd && state.general.param1 && state.general.param1 != '' && state.icdCategory.records.find(item => item._id === state.general.param1));

  let categoryType = useSelector(state => state.icdCategory.recordsForSelect);
  let languages = useSelector(state => state.language.records);
  let [childCategories, setChildCategories] = useState([]);

  if (details) {
    // ================== Multiple Child Filter Start ======================
    if (typeof (childCategories[details]) === "undefined") {
      childCategories.push(details);
    }
    // Recursive Function To filter out multiple child modules
    const filterMultipleChild = async (id, categories) => {
      let records = await categories.filter(obj => parseInt(obj.parent) === id)
      if (records && records.length) {
        await records.map(async item => {
          if (typeof (childCategories[item]) === "undefined") {
            childCategories.push(item);
          }
          filterMultipleChild(item._id, categories);
        });
      } else {
        return 1;
      }
    }

    filterMultipleChild(details._id, categoryType);
    let yFilter = childCategories.map(itemY => { return itemY._id; });
    let filteredX = categoryType.filter(itemX => !yFilter.includes(itemX._id));
    categoryType = filteredX || [];
    // ================== Multiple Child Filter End ======================
  } else {
    
    categoryType = categoryType && categoryType.filter(item => { if (item.status == 1 && item.name['en'] ) {  item.name['en'] = item.name['en'].length > 40 ? `${item.name['en'].substring(0, 40)}...` : item.name['en']; return item; } }) || [];
  }
categoryType.splice(0, 0, { _id: "null", name: {en:"Parent Category" }});

  // let filteredCategories = []
  // if (categoryType) {
  //   categoryType && categoryType.length && categoryType.forEach(element => {
  //     filteredCategories.push({ id: element._id, name: {element.name });
  //   });
  // }

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      debugger;
      await dispatch(update_icd_categories(data, result => {
        if (result.messageID === 200) {
          history.push('/icd-categories');
        }
      }));
    } else {
      dispatch(create_icd_categories(data, result => {

        if (result.messageID === 200) history.push('/icd-categories');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/icd-categories')} title={details ? isView ? 'ICD Category ' : 'Edit ICD Category' : 'Add ICD Category'} />
      <Row>
        <Col lg="12">
          <ICDCategoriesForm title="ICD Category Information" details={details} editable={!isView} categoryType={categoryType} languages={languages} submitData={(val) => _submitData(val)} cancel={() => history.push('/icd-categories')} />
        </Col>
      </Row>
    </>
  )
};

export default AddICDCategories;
