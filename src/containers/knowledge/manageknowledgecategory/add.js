import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import KnowledgeCategoryFrom from "../components/knowledgeCategoryForm";
import { get_language } from '../../../context/actions/questionnaire';
import { create_knowledge_category, update_knowledge_category, list_knowledge_category_list } from '../../../context/actions/knowledge';
import { pagination } from '../../../utils/constants';

const AddKnowledgeCategory = ({ match, history }) => {

  const dispatch = useDispatch();
  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));
  useEffect(() => {
    dispatch(list_knowledge_category_list({ limit: pagination.maxlimit, page: 1 }));
    dispatch(get_language({}));
  }, []);
  let details = useSelector(state => state.knowledge.knowledgecategory.records && isAdd && state.general.param1 && state.general.param1 != '' && state.knowledge.knowledgecategory.records.find(item => item['@rid'] === state.general.param1));
  let languageList = useSelector(state => state.general.language) || [];

  let categoryList = useSelector(state => state.knowledge.knowledgecategory.categories);

  let [childCategories, setChildCategories] = useState([]);

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
    if (categoryList && categoryList.length > 0) {
      categoryList = categoryList.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } });
    } else {
      categoryList = []
    }

  }

  categoryList.splice(0, 0, { "id": "0", name: "Parent" });

  let filteredCategories = []
  if (categoryList) {
    categoryList && categoryList.length && categoryList.forEach(element => {
      filteredCategories.push({ id: element['id'], name: element.name });
    });
  }



  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_knowledge_category(data, result => {
        if (result.messageID === 200) {
          history.push('/knowledge-category');
        }
      }));
    } else {
      dispatch(create_knowledge_category(data, result => {
        if (result.messageID === 200) history.push('/knowledge-category');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/knowledge-category')} title={details ? isView ? 'Knowledge Category' : 'Edit Knowledge Category' : 'Add Knowledge Category'} />
      <Row>
        <Col lg="12">
          <KnowledgeCategoryFrom title="Manage Knowledge Category" details={details} categories={filteredCategories} languageList={languageList} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/knowledge-category')} />
        </Col>
      </Row>
    </>
  )
};

export default AddKnowledgeCategory;
