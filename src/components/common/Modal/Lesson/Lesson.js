import React from "react";
import { Button } from "shards-react";
import iFrame from 'react-iframe';
import "./Lesson.scss";
const Lesson = ({ open, remove = 'open',dataSendValue }) => {

    return (
        <>
            <div className="confirmBlock text-center">
              <p>
               {JSON.stringify(dataSendValue)}
                 </p>
            
                <div className="confirmBlock-btn">
                    <Button onClick={() => open('ok')}>Previous</Button>
                    <Button theme="danger" onClick={() => open('no')}>
                         Next</Button>
                </div>
            </div>
        </>
    );
};

export default Lesson;
