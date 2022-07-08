import React from "react";
import { Button } from "shards-react";
import "./ConfirmBlock.scss";
const ConfirmBlock = ({ confirm, remove = 'delete' }) => {

    return (
        <>
            <div className="confirmBlock text-center">
                <p>
                    Are you sure you want to {remove}?
                 </p>
                <div className="confirmBlock-btn">
                    <Button onClick={() => confirm('ok')}>OK</Button>
                    <Button theme="danger" onClick={() => confirm('no')}> Cancel</Button>
                </div>
            </div>
        </>
    );
};

export default ConfirmBlock;
