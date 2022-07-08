import React from "react";
import './NoRecord.scss';

const NoRecord = ({ noRecord, className }) => {
  return (
    <>
      <div className={`noRecordFound d-flex align-items-center justify-content-center p-3 ${className}`}>
        <label className="text-center">
          <img src={noRecord.ImageNoRecord} alt="No Record" />
          <span className="d-block">No Records Found !</span>
        </label>
      </div>
    </>
  );
};
NoRecord.defaultProps = {
  noRecord: {
    ImageNoRecord: require('../../../images/noRecord.svg')
  }
};
export default NoRecord;