import React, { useState, createRef } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button } from "shards-react";

import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import KnowledgeMedia from "./knowledgeMedia";
import { Assets, IconType } from '../../../utils/constants';

const KnowledgeForm = ({ titleName, details, mediaData, Categories, Language, editable = false, submitData, cancel, submitMedia }) => {

  const view = details ? editable ? false : true : false;
  const edit = details ? editable ? true : false : false;
  const languageRef = createRef(), titleRef = createRef(), assetsRef = createRef();
  const [language, setLanguage] = useState(details ? details['language'] : Language && Language.length ? Language[0]['@rid'] : '');
  const [title, setTitle] = useState(details ? details['name'] : '');
  const [selectedCategory, setSelectedViews] = useState(details ? details.category : []);
  const [multiSelectErr, setMultiSelectErr] = useState();
  const [assets, setAssets] = useState(details ? details['assets'].length ? '' : '' : '');
  // Media
  const [available, setAvailable] = useState(details ? details.AvailableSections.length ? true : false : false);
  const [availableMedia, setAvailableMedia] = useState(details ? details.AvailableSections ? [...details.AvailableSections] : [] : []);
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const _handleSelected = (item) => {
    let obj = [...availableMedia];
    let index = obj.findIndex((e) => e.mediaId === item["@rid"]);
    const rankindex = obj.length + 1;
    let payload = {};
    if (item.type === "video") payload = { section_name: item.name, video_url: item.mediaUrl, rank: rankindex, mediaId: item["@rid"], type: "video" };
    if (item.type === "contentPage") payload = { section_name: item.name, mediaId: item["@rid"], rank: rankindex, type: "contentPage" };
    if (item.type === "pdf") payload = { section_name: item.name, mediaId: item["@rid"], rank: rankindex, type: "pdf" };
    index !== -1 ? obj.splice(index, 1) : obj.push(payload);
    setAvailableMedia([...obj]);
  };

  const _handleMedia = (obj) => {
    if (obj.type === "video") {
      const mediaUrl = typeof obj.mediaUrl !== "string" ? obj.mediaUrl["0"] : obj.mediaUrl;
      let body = new FormData();
      body.append("name", obj.name);
      body.append("mediaUrl", mediaUrl);
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
    if (obj.type === "contentPage") {
      let body = new FormData();
      body.append("name", obj.name);
      body.append("content", obj.content);
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
    if (obj.type === "pdf") {
      let body = new FormData();
      const mediaUrl = obj.mediaUrl !== "string" ? obj.mediaUrl["0"] : obj.mediaUrl;
      body.append("name", obj.name);
      body.append("mediaUrl", mediaUrl);
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
  };

  const handleEditSelection = (type) => {
    let newtype = '';
    if (type === 'video') newtype = '0';
    if (type === 'pdf') newtype = '1';
    if (type === 'contentPage') newtype = '2';
    if (!view) { setAvailable(false); setAssets(newtype); assetsRef.current.props.onChange(newtype); }
  }

  const deleteMedia = (index) => {
    availableMedia.splice(index, 1);
    setAvailableMedia([...availableMedia]);
  }

  const onSelect = (selectedList, selectedItem) => {
    selectedCategory.push({ name: selectedItem.name, rid: selectedItem['@rid'] });
    setSelectedViews([...selectedCategory]);
  }
  const onRemove = (selectedList, removedItem) => {
    let indx = selectedCategory.findIndex(e => e.rid == removedItem.rid);
    selectedCategory.splice(indx, 1);
    setSelectedViews(selectedCategory);
  }

  const _handleKeypress = (e) => { checkValidationAndSubmit(); }

  const checkValidationAndSubmit = () => {
    if (!selectedCategory.length) setMultiSelectErr(true);
    else setMultiSelectErr(false)
    languageRef.current.props.onChange(language); titleRef.current.props.onChange(title);
    // assetsRef.current.props.onChange(assets);
    if (language === '' || !selectedCategory.length || title === '' || (edit ? availableMedia.length ? false : assets === '' : assets === '')) console.log("Values should not be empty");
    else {
      let payload = { category: selectedCategory, language: language, title: title, assets: assets, videos: [], pdfs: [], contentPages: [], status: status ? 1 : 2 };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      payload.videos = availableMedia.filter((item) => item["type"] === "video");
      payload.contentPages = availableMedia.filter((item) => item["type"] === "contentPage");
      payload.pdfs = availableMedia.filter((item) => item["type"] === "pdf");
      submitData(payload);
    };
  }

  return (
    <>
      <Card small className="mb-4" >
        <CardHeader className="border-bottom">
          <h6 className="m-0">{titleName}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Language" Placeholder="Select Language" val={language} options={Language} handleVal={(val) => setLanguage(val)} edit={editable} ref={languageRef} />
                    </Col>
                    <Col>
                      <TextBox Name="Title" Placeholder="Title" min={1} value={title} handleVal={(val) => setTitle(val)} edit={editable} ref={titleRef} handleKeypress={(e) => _handleKeypress(e)} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg="6" className="form-group">
                      <label>Select Category
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                      <div className="multiselectWrapper position-relative d-flex category-module-drop">
                        <div className="multiselectCol flex-fill mr-2">
                          <Multiselect
                            options={Categories} // Options to display in the dropdown
                            selectedValues={selectedCategory}
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            disable={editable ? '' : 'true'}
                            onChange={() => { }}
                          />
                          {multiSelectErr && !selectedCategory.length && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required</div>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox Name="Assets" Placeholder="Select Assets" val={assets} options={Assets} isRequired={edit ? availableMedia.length ? false : true : true} handleVal={(val) => { setAssets(val); setAvailable(false) }} edit={editable} ref={assetsRef} />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={details ? (editable ? true : false) : true} />
                    </Col>
                  </Row>
                  {!available && <Row form className="lessionBlockRw">
                    <Col sm="12">
                      <KnowledgeMedia
                        selectedTab={assets}
                        handleAvailable={(val) => setAvailable(val)}
                        handleMedia={(obj) => _handleMedia(obj)}
                        handleSelected={(val) => _handleSelected(val)}
                        handleTab={() => { }}
                        listData={mediaData}
                        availableMedia={availableMedia}
                        editable={editable}
                      />
                    </Col>
                  </Row>}
                  <Row form>
                    <Col sm="12">
                      {available && availableMedia.length ? (
                        <Row form className="lessionBlockRw custom-lessionBlockRw">
                          Available Sections :
                          <Col sm="12">
                            <div className="tab-con-scroll">
                              {availableMedia.length &&
                                availableMedia.map((item, index) => {
                                  return (
                                    <div key={index} className="outer-grid">
                                      <div key={index} className="row">
                                        <div className="col-sm-4">
                                          <span>{item.section_name.length > 35 ? `${item.section_name.substring(0, 35)}...` : item.section_name}</span>
                                        </div>
                                        <div className="col-sm-4 outer-grid-icon"><i className="material-icons">{IconType[item.type]}</i></div>
                                        <div className="col-sm-4 grid-action-btn text-right">
                                          <i className="fa fa-edit" aria-hidden="true" onClick={() => handleEditSelection(item.type)}></i>
                                          <i className="fa fa-trash" aria-hidden="true" onClick={() => { !view && deleteMedia(index) }}></i>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </Col>
                        </Row>
                      ) : ("")}
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {(available && availableMedia.length) ? (details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>) : null}
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card >
    </>
  );
}

export default KnowledgeForm;
