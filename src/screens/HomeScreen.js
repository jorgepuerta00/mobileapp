import React from "react";
import Shops from "../container/shops/Shops";

import { ConnectedComponent as connect } from '../components';

class HomeScreen extends React.Component {
  render() {
    return (
      <Shops {... this.props}/>
    );
  }
}

export default connect(HomeScreen);