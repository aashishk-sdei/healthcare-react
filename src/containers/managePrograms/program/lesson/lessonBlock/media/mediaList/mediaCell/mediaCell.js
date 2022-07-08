import React from "react";
import { Button } from "reactstrap";

import "./mediaCell.scss";

const MediaCell = ({ className = "", item, mediaType, _handleVal, _isChecked }) => {
  return (
    <>
      <div className={`mediaCell d-flex flex-column position-relative video-con video-hght-dv ${className}`}>
        {/* <LoaderUI className="position-absolute" /> */}
        {_isChecked(item["@rid"]) ? (
          <Button color="success" className="position-absolute mediaCloseBtn rounded-circle p-0"><i className="material-icons">check</i></Button>
        ) : ("")}
        <div
          className="mediaBox d-flex align-items-center justify-content-center overflow-hidden"
          onClick={() => _handleVal(item)}
        >
          {mediaType === "video" ? (<video width="560" height="315" src={item.mediaUrl} frameBorder="0" autoPlay={false} controls></video>) : null}
          {/* allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" */}
          {mediaType === "content" ? (
            <i className="material-icons">description</i>
          ) : null}
          {mediaType === "Reward" ? (
            <i className="material-icons">emoji_events</i>
          ) : null}
          {mediaType === "questionnaire" ? (
            <i className="material-icons">help</i>
          ) : null}
        </div>
        <div className="mediaLabel overflow-hidden">
          {item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}
        </div>
        {/* <div className="d-flex flex-wrap mediaInfoCell">
          <span><span>Size:</span>{item.size}</span>
          <span className="ml-auto ml-2"><span>Date:</span>{moment(item.createdAt).format("MM/DD/YYYY")}</span>
        </div> */}
      </div>
    </>
  );
};

export default MediaCell;
