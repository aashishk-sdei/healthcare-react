import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import LoaderUI from "../components/common/Loader/Loader";

const DefaultLayout = ({ children, noNavbar, noFooter, history }) => {
  let { general, user } = useSelector(state => state);
  if (!user.loggedIn) history.push('/');

  return (
    <Container fluid>
      <Row>
        <MainSidebar />
        <Col className="main-content main-content-blc p-0" tag="main">
          {!noNavbar && <MainNavbar />}
          <Container fluid className="main-content-container px-4 position-relative">
            {general.loading && <LoaderUI
              loader={general.loading}
              overlay={true}
              overlayRadius='rounded-10'
              FullWindow={false}
              color="primary"
              customSize="lg"
            />}
            {children}
          </Container>
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  )
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
