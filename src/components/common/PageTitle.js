import React from "react";
// import classNames from "classnames";
import PropTypes from "prop-types";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  // const classes = classNames(
  //   className,
  //   "text-center",
  //   "text-md-left",
  //   "mb-sm-0"
  // );

  return (
    <div className={`classes ${className}`} {...attrs}>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
    </div>
  )
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string
};

export default PageTitle;
