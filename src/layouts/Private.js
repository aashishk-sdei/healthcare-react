import React from "react";
import PropTypes from "prop-types";
import { Container } from "shards-react";
import { useSelector } from 'react-redux';
import './privateLayout.scss';
import LoaderUI from "../components/common/Loader/Loader";


const PrivateLayout = ({ children, history }) => {
  let isLoading = useSelector(state => state.general.loading);
  let user = useSelector(state => state.user.loggedIn);
  if (user && children.props.match.path === '/login') history.push('/dashboard');
  return (
    <Container fluid className="privateWrapper d-flex align-items-center justify-content-center">
      {isLoading && <LoaderUI
        loader={isLoading}
        overlay={true}
        overlayRadius='rounded-0'
        size=""
      />}
      {children}
    </Container>
  )
};

PrivateLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

PrivateLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default PrivateLayout;
