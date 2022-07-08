import React from "react";
// import "./loader.scss";
const DataLoader = () => {
  return (
    <div className="dataLoader block position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span
          className="spinner-border text-primary"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    </div>
  );
};

export default DataLoader;
