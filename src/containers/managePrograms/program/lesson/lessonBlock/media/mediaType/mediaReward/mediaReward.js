import React, { useState, useEffect, createRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { Row, Col, Button, Input } from "reactstrap";
import { Card, ListGroup, ListGroupItem } from "shards-react";
import MediaList from "../../mediaList/mediaList";
import MediaHeader from "../MediaHeader/MediaHeader";
import { TextBox } from "../../../../../../../../components/common/FormsInput";

import "./mediaReward.scss";
import "../media.scss";
const MediaReward = ({ tab, _handleMedia, _handleSelected, rewards, availableMedia, }) => {
  const nameRef = createRef();
  const [mediaType, setMediaType] = useState("");
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [errFlag, setErrFlag] = useState(false);
  const [mediaUrl, setMediaUrl] = useState();
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>"))));
  const [fileErr, setFileErr] = useState(false);

  useEffect(() => {
    setMediaType("");
    setMediaUrl("");
    setName("");
    setIsSubmit(true);
    nameRef.current.props.onChange("");
    setErrFlag(false);
    setDescription('');
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>"))));
  }, [tab]);

  const onEditorStateChange = (editorState) => {
    description.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    setEditorState(editorState);
    setDescription(
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
    setMediaType("content");
  };

  const handleMediaSelect = (data) => {
    if (data[0].type.includes("doc") || data[0].type.includes("doc") || data[0].type.includes("docs") || data[0].type.includes("docx")) {
      setMediaUrl(data); setFileErr(false); setMediaType("media");
    } else setFileErr(true);
  };

  const checkValidationAndSubmit = () => {
    nameRef.current.props.onChange(name);
    setIsSubmit(false);
    if (mediaType !== "") {
      if (name === "" || (mediaType === "media" && mediaUrl === undefined)) {
        setErrFlag(true);
        console.log("Values should not be empty file");
      } else if (
        mediaType === "content" &&
        (description === "" || description.length <= 11)
      ) {
        setErrFlag(true);
        console.log("Values should not be empty content");
      } else {
        setMediaType("");
        setMediaUrl("");
        setName("");
        setIsSubmit(true);
        nameRef.current.props.onChange("");
        setErrFlag(false);
        setDescription('');
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>"))));
        _handleMedia({
          name: name,
          mediaType: mediaType,
          mediaUrl: mediaType === "media" ? mediaUrl : description
        });
      }
    } else {
      console.log("Here validation call, No fields are filled");
    }
  };

  // check selected Rewards
  const isSelected = (id) =>
    availableMedia.findIndex((e) => e.mediaId === id) !== -1 ? true : false;

  return (
    <>
      <Card small className="addSectionWrapper shadow-none">
        <MediaHeader title="Add Reward" buttonTitle="Select Reward from List" />
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <div className="addSection">
                  <div className="fileLink flex1 mb-15">
                    <TextBox Name="Reward Title" Placeholder="Enter Reward Title" min={1} value={name} handleVal={(val) => setName(val)} isRequired={!isSubmit} ref={nameRef} />
                  </div>
                  <div className="addSection-rw d-flex dragDropBlockRw">
                    <div className="dragDropReward d-flex flex1 align-items-center justify-content-center">
                      <div className="dragDropCell d-flex flex1 align-items-center justify-content-center">
                        {(mediaType === "" ||
                          mediaType === "content" ||
                          fileErr) && (<Button color="link" className="mb-0 d-flex align-items-center justify-content-center browseCell position-relative">
                            <Input type="file" name="file" className="position-absolute" onChange={(e) => { setMediaType("media"); handleMediaSelect(e.target.files); }} />
                            <i className="material-icons">search</i>Browse for
                            File
                          </Button>
                          )}
                        {(mediaType === "" || fileErr) && <span>or</span>}
                        {(mediaType === "" || mediaType === "media") && (
                          <Button color="link" onClick={() => { setMediaType("content"); setMediaUrl(""); }} className="btn btn-link d-flex align-items-center justify-content-center browseCell  createFileBtn"                          >
                            <i className="material-icons">create</i>Create File
                            with Editor
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="addSection-rw">
                    <div className="position-relative editorBlock">
                      {mediaType === "content" && (
                        <>
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                          />
                          {errFlag && description.length <= 11 && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              This field is required
                            </div>
                          )}
                        </>
                      )}
                      {mediaType === "media" && mediaUrl && mediaUrl[0].name && (
                        <div className="upload-content">
                          <div className="upload-content-inner custom-upload-content-inner">
                            <div className="upload-icon">
                              <i class="material-icons">description</i>
                            </div>
                            <div className="upload-content">
                              <span className="">
                                {mediaUrl && mediaUrl[0].name}
                              </span>
                            </div>
                            <Button
                              theme="link"
                              className=""
                              onClick={() => {
                                setMediaType("");
                                setMediaUrl("");
                              }}
                            >
                              <i className="material-icons">clear</i>
                            </Button>
                          </div>
                        </div>
                      )}
                      {mediaType === "media" && fileErr && (
                        <div className="erro danger">
                          You can only select the following format: doc, docs,
                          docx.
                        </div>
                      )}
                      {!fileErr && mediaType !== "" && (
                        <div className="editor-btm mt-3 text-right media-action-btn mb-15">
                          <Button
                            color="primary"
                            onClick={() => checkValidationAndSubmit()}
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="addSection-rw">
                    <MediaList
                      data={{ mediaType: "Reward", list: rewards }}
                      handleVal={(val) => _handleSelected(val)}
                      isChecked={(e) => isSelected(e)}
                      title="Select Reward"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
};

export default MediaReward;
