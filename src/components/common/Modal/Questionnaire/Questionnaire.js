import React, { useState } from "react";
import { Button } from 'reactstrap';
// import "./Questionnaires.scss";

const QuestionnaireModal = ({ data, submit, cancel }) => {
  const [newData, setNewData] = useState([...data.assignQuestion]);
  const handleOnChange = (child, parent, value) => {
    newData[parent].answers[child]['status'] = value ? 0 : 1;
    setNewData([...newData]);
  }
  return (
    <>
      <div className="QuestionnaireModal">
        <div className="">
          <div className="survey-dv">
            <div className="survey-main-head">{data.questionnaireName}</div>
            {data.assignQuestion.map((item, parent) => {
              return (
                <div key={parent}>
                  {item.answers.length ? <>
                    {parent && data.assignQuestion[parent - 1]['questionCategoryName'] === data.assignQuestion[parent]['questionCategoryName'] ? '' : <div className="survey-box">{item.questionCategoryName}</div>}
                    <div className="survey-content">
                      {/* <h2>{parent + 1}. {item.question}</h2> */}
                      <h2> {item.question}</h2>
                      <div className="outer-checkbox">
                        {item && item.answers.map((value, child) => {
                          return (
                            <div key={child} className="custom-control custom-checkbox mb-1">
                              <input type="checkbox" className="custom-control-input" checked={value.status === 0 ? true : false} id={`answer${parent}${child}`} onChange={(e) => handleOnChange(child, parent, e.target.checked)} />
                              <label className="custom-control-label" htmlFor={`answer${parent}${child}`}>{value.name}</label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </> : ''}
                </div>
              );
            })}
            <div className='formBtns text-right'>
              <Button theme="white" onClick={() => cancel()} className="btn-white">Cancel</Button>
              <Button theme="accent" onClick={() => submit(newData)} className="btn-accent">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireModal;