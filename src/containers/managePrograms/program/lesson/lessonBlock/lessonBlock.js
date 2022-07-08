import React, { createRef, useState } from "react";
import { Row, Col, Form, Button } from "shards-react";
import { TextBox, SelectBox } from "../../../../../components/common/FormsInput";
import Media from "./media/media";
import { CompletionFlags, IconType } from "../../../../../utils/constants";
import "./lessonBlock.scss";
const LessonBlock = ({ details, Language, mediaData, AvailableSections = [],
   editable = false, submitData, submitMedia, cancel, }) => {
  const nameRef = createRef();
  const languageRef = createRef();
  const completionFlagRef = createRef();

  const [name, setName] = useState(details ? details["name"] : "");
  const [tabIndex, setTabIndex] = useState("");
  const [language, setLanguage] = useState(details ? details["language"] : Language[0]['@rid']);
  const [completionFlag, setCompletionFlag] = useState(details ? details["completionFlag"] : "");
  const [available, setAvailable] = useState(AvailableSections.length ? true : false);
  const [availableMedia, setAvailableMedia] = useState([...AvailableSections]);

  const addLession = () => {
    nameRef.current.props.onChange(name);
    languageRef.current.props.onChange(language);
    completionFlagRef.current.props.onChange(completionFlag);

    if ((language === "" || name === "" || completionFlag === "")) console.log("Values should not be empty");
    else {
      let payload = {
        name: name,
        language: language,
        completionFlag: completionFlag,
        status: 1,
        videos: [],
        contentPages: [],
        questionnaires: [],
        rewards: [],
        pdf:[],
      };
      if (details && details["@rid"]) payload = { ...payload, recordId: details["@rid"] };
      payload.videos = availableMedia.filter((item) => item["type"] === "video");
      payload.contentPages = availableMedia.filter((item) => item["type"] === "contentPage");
      payload.questionnaires = availableMedia.filter((item) => item["type"] === "questionnaire");
      payload.rewards = availableMedia.filter((item) => item["type"] === "reward");
      payload.pdf = availableMedia.filter((item)=>item["type"] === "pdf");
      submitData(payload);
    }
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
      body.append("content", obj.content.slice(1, -1).replace(/\s+/g, '').trim());
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
    if (obj.type === "reward") {
      let body = new FormData();
      const mediaUrl = obj.mediaUrl !== "string" ? obj.mediaUrl["0"] : obj.mediaUrl.slice(1, -1).replace(/\s+/g, '').trim();
      body.append("name", obj.name);
      body.append("mediaUrl", mediaUrl);
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
    
    if (obj.type === "pdf") {
      let body = new FormData();
      const mediaUrl = obj.mediaUrl !== "string" ? obj.mediaUrl["0"] : obj.mediaUrl.slice(1, -1).replace(/\s+/g, '').trim();
      body.append("name", obj.name);
      body.append("mediaUrl", mediaUrl);
      body.append("type", obj.type);
      body.append("mediaType", obj.mediaType);
      body.append("status", 1);
      submitMedia(body);
    }
  };

  const _handleSelected = (item) => {
    let obj = [...availableMedia];
    let index = obj.findIndex((e) => item.type === "questionnaire" ? e.quest_id === item["@rid"] : e.mediaId === item["@rid"]);
    const rankindex = obj.length + 1;
    let payload = {};
    if (item.type === "video")
      payload = { section_name: item.name, video_url: item.mediaUrl, rank: rankindex, mediaId: item["@rid"], type: "video", };
    if (item.type === "contentPage")
      payload = {
        section_name: item.name,
        // content_page: item.content.slice(1, -1).replace(/\s+/g, '').trim(),
        mediaId: item["@rid"],
        rank: rankindex,
        type: "contentPage",
      };
    if (item.type === "questionnaire")
      payload = {
        section_name: item.name,
        quest_id: item["@rid"],
        rank: rankindex,
        type: "questionnaire",
      };
    if (item.type === "reward")
      payload = {
        section_name: item.name,
        mediaId: item["@rid"],
        rank: rankindex,
        type: "reward",
      };
      if (item.type === "pdf")
      payload = {
        section_name: item.name,
        mediaId: item["@rid"],
        rank: rankindex,
        type: "pdf",
      };

    index !== -1 ? obj.splice(index, 1) : obj.push(payload);
    setAvailableMedia([...obj]);
  };

  const deleteMedia = (index) => {
    availableMedia.splice(index, 1);
    setAvailableMedia([...availableMedia]);
  };

  return (
    <>
      <div className="lessionBlock">
        <Form>
          <Row form className="lessionBlockRw">
            <Col md="6">
              <SelectBox
                Name="Language"
                Placeholder="Select Language"
                val={language}
                options={Language}
                handleVal={(val) => setLanguage(val)}
                edit={editable}
                ref={languageRef}
              />
            </Col>
            <Col md="6">
              <TextBox
                Name="Lesson Title"
                Placeholder="Lesson Title"
                min={1}
                value={name}
                handleVal={(val) => setName(val)}
                edit={editable}
                ref={nameRef}
              />
            </Col>
          </Row>
          <Row form className="lessionBlockRw">
            <Col md="6">
              <SelectBox
                Name="Completion Flag"
                Placeholder="Select Completion Flag"
                val={completionFlag}
                options={CompletionFlags}
                handleVal={(val) => setCompletionFlag(val)}
                edit={editable}
                ref={completionFlagRef}
              />
            </Col>
          </Row>
          <Row form className="lessionBlockRw">
            <Col sm="12">
              <Media
                tabIndex={tabIndex}
                handleAvailable={(val) => setAvailable(val)}
                handleMedia={(obj) => _handleMedia(obj)}
                handleSelected={(val) => _handleSelected(val)}
                handleTab={tab => setTabIndex(tab)}
                listData={mediaData}
                availableMedia={availableMedia}
                editable={editable}
                lesson={true}
              />
            </Col>
          </Row>
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
                            <div className="col-sm-4 grid-action-btn text-right"><i className="fa fa-trash" aria-hidden="true" onClick={() => deleteMedia(index)}></i></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Col>
            </Row>
          ) : ("")}

          <div className="formBtns text-right">
            {tabIndex === '' && (<Button theme="white" onClick={() => cancel()}>
              Cancel
            </Button>)}
            {available && (<Button theme="accent" onClick={() => addLession()}>
              {details ? 'Update' : 'Submit'}
            </Button>)}
          </div>
        </Form>
      </div>
    </>
  );
};

export default LessonBlock;
