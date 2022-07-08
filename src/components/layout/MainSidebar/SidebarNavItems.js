import React from "react";
import { connect } from 'react-redux';
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user,
      // Store.getSidebarItems()
      navItems: props.user.role === 1 ? Store.getSidebarAdminItems() : Store.getSidebarGroupAdminItems(),
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
      // navItems: Store.getSidebarItems()
      navItems: this.state.user.role === 1 ? Store.getSidebarAdminItems() : Store.getSidebarGroupAdminItems()

    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
  // filters: state.App.Items.Filters,
});

const mapDispatchToProps = dispatch => ({
  onMyAction: value => {
    dispatch(() => console.log(`${value}`));
  },
});

// export default SidebarNavItems;
export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);

