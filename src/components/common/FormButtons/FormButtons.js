import React from "react";
import { Button } from "shards-react";
import "./FormButtons.scss";
const FormButtons = ({ className = '' }) => {
    return (
        <>

            <div className={`formBtns ${className}`}>
                <Button theme="white">Cancel</Button>
                <Button>Save</Button>
            </div>
        </>
    );
};

export default FormButtons;
