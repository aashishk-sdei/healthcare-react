import React from "react";
import { Button } from "shards-react";
import "./ValidationAlert.scss";
const ValidationAlert = ({ confirm }) => {

    return (
        <>
            <div className="confirmBlock text-center">
                <p>
                    Please add options for the selected answer type.
                 </p>
                <div className="confirmBlock-btn">
                    <Button onClick={() => confirm('ok')}>OK</Button>
                    <Button theme="danger" onClick={() => confirm('no')}> Cancel</Button>
                </div>
            </div>
        </>
    );
};

export default ValidationAlert;
