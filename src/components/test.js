import React from "react";
import { useDispatch, useSelector } from 'react-redux';


const Test = ({ match }) => {
  let lession = useSelector(state => state.program.lession.records.length && state.program.lession.records.find(item => item && item['@rid'] === `#${match.params.id}`));
  console.log("lession: ", lession);

  return (
    <p>Hello, This is test.</p>
  )
}

export default Test;