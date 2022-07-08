import React from "react";
import "./SwitchCell.scss";
const SwitchCell = ({ className = '' }) => {
    return (
        <>
            <div className={`custom-control custom-switch switchCell ${className}`}>
                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                <label className="custom-control-label" for="customSwitch1">Yes/No</label>
            </div>
        </>
    );
};

export default SwitchCell;
