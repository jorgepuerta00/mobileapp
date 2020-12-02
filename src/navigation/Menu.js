import React from "react";
import ModalMenu from "../container/menu/Menu";

import { ConnectedComponent as connect } from '../components';

class Menu extends React.Component {
  render() {
    return (
      <ModalMenu {... this.props} />
    );
  }
}

export default connect(Menu);