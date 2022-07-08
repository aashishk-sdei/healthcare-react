import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, Button, FormInput, Card, CardHeader, Button } from "shards-react";
import UserPic from "./../UserPic/UserPic";
import './UserDetails.scss';

const UserDetails = ({ edit, details }) => (
  <Card small className="mb-4 pt-3 overflow-hidden">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <UserPic
          src={details.avatar}
          alt={details.name}
          loader={true}
        />
      </div>
      <h4 className="mb-0">{details.name}</h4>
      <span className="text-muted d-block mb-2">{details.jobTitle}</span>
      <Button pill outline theme="light" size="sm" className="mb-2 shadow-none uploadBtn position-relative">
        <FormInput type="file" className="position-absolute" />
        <i className="material-icons mr-1">cloud_upload</i> Upload Image
      </Button>
    </CardHeader>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("../../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
