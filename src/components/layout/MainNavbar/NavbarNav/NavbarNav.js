import React from "react";
import { Nav } from "shards-react";

// import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default ({ className = '' }) => (
  <Nav navbar className={`border-left flex-row ${className}`}>
    {/* <Notifications /> */}
    <UserActions />
  </Nav>
);
