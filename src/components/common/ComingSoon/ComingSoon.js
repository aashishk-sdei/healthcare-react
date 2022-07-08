


import React from "react";
import './ComingSoon.scss';

const ComingSoon = ({ ComingSoon }) => {
  return (
    <>
      <div className="comingSoon d-flex align-items-center justify-content-center p-3">
        <label className="text-center">
          <img src={ComingSoon.Image} alt="Coming Soon" />
          {/* <span className="d-block">Coming Soon !</span> */}
        </label>
      </div>
    </>
  );
};
ComingSoon.defaultProps = {
  ComingSoon: {
    Image: require('./../../../images/comingsoon.png')
  }
};
export default ComingSoon;