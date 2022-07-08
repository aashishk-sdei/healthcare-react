import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import ContentPageForm from "../components/contentPageForm";
import { create_content_page, update_content_page, list_content_page_for_select } from '../../../context/actions/contentPage';
import { pagination } from '../../../utils/constants';

const AddManageView = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_content_page_for_select({ limit: pagination.maxlimit, page: 1 }));
  }, []);

  const isView = match.path.includes("view");
  const isAdd = (match.path.includes("view") || match.path.includes("edit"));

  let details = useSelector(state => state.contentPage.records && isAdd && state.general.param1 && state.general.param1 != '' && state.contentPage.records.find(item => item['@rid'] === state.general.param1));

  let dependentPages = useSelector(state => state.contentPage.recordsForSelect);

  let [childPages, setChildPages] = useState([]);

  if (details) {
    // ================== Multiple Child Filter Start ======================
    if (typeof (childPages[details]) === "undefined") {
      childPages.push(details);
    }
    // Recursive Function To filter out multiple child modules
    const filterMultipleChild = async (id, pages) => {
      let records = await pages.filter(obj => parseInt(obj.parentId) === id)
      if (records && records.length) {
        await records.map(async item => {
          if (typeof (childPages[item]) === "undefined") {
            childPages.push(item);
          }
          filterMultipleChild(item['id'], pages);
        });
      } else {
        return 1;
      }
    }

    filterMultipleChild(details.id, dependentPages);

    let yFilter = childPages.map(itemY => { return itemY.id; });
    let filteredX = dependentPages.filter(itemX => !yFilter.includes(itemX.id));
    dependentPages = filteredX;
    // ================== Multiple Child Filter End ======================
  } else {
    dependentPages = dependentPages.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 40 ? `${item['name'].substring(0, 40)}...` : item['name']; return item; } });
  }

  dependentPages.splice(0, 0, { "id": "0", name: "Parent" });

  let filteredPages = []
  if (dependentPages) {
    dependentPages && dependentPages.length && dependentPages.forEach(element => {
      filteredPages.push({ id: element['id'], name: element.name });
    });
  }

  const _submitData = async (data) => {
    if (data['recordId'] && data['recordId'] !== '') {
      await dispatch(update_content_page(data, result => {
        if (result.messageID === 200) {
          history.push('/content-page-list');
        }
      }));
    } else {
      dispatch(create_content_page(data, result => {
        if (result.messageID === 200) history.push('/content-page-list');
      }));
    }
  }

  return (
    <>
      <PageHeader button={details && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/content-page-list')} title={details ? isView ? 'Content Page' : 'Edit Content Page' : 'Add Content Page'} />
      <Row>
        <Col lg="12">
          <ContentPageForm title="Content Page Information" details={details} dependentPages={filteredPages} editable={!isView} submitData={(val) => _submitData(val)} cancel={() => history.push('/content-page-list')} />
        </Col>
      </Row>
    </>
  )
};

export default AddManageView;
