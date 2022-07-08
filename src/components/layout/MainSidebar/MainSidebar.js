import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
// import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";
import store from "../../../flux/store";

class MainSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      menuVisible: false,
      sidebarNavItems: props.user.role === 1 ? Store.getSidebarAdminItems() : Store.getSidebarGroupAdminItems()
      // getSidebarItems
      // getSidebarAdminItems
      // getSidebarGroupAdminItems
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: this.state.user.role === 1 ? Store.getSidebarAdminItems() : store.getSidebarGroupAdminItems()
    });
  }

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
      >
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
        {/* <SidebarSearch /> */}
        <SidebarNavItems />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

const mapStateToProps = state => ({
  user: state.user
  // filters: state.App.Items.Filters,
});

/*
connect dispatch to props so that you can call the methods from the active props scope.
The defined method `onMyAction` can be called in the scope of the componets props.
*/
const mapDispatchToProps = dispatch => ({
  onMyAction: value => {
    dispatch(() => console.log(`${value}`));
  },
});

// export default MainSidebar;
export default connect(mapStateToProps, mapDispatchToProps)(MainSidebar);
