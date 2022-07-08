import React from "react";
import "./Heading4.scss";
const Heading4 = ({className = '',children}) => {
    return (
        <>
            <h4 className={ `heading4 ${className}`}>
                {children}
            </h4>
        </>
    );
};

export default Heading4;
