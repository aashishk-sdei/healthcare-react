import React from "react";
import { Spinner } from 'reactstrap';
import './UserPic.scss';
const UserPic = (
    { 
        src,
        alt,
        loader=false
    }) => (
    <span className="userPic rounded-circle d-inline-flex align-items-center justify-content-center position-relative">
        <img
          className="rounded-circle"
          src={src}
          alt={alt}
        />
        {
            loader ? <Spinner color="primary" className="position-absolute"/> :null
        }
    </span>
);


export default UserPic;
