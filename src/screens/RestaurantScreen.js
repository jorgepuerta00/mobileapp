import React from "react";
import Restaurant from "../container/shops/Restaurant";

import { ConnectedComponent as connect } from '../components';

class RestaurantScreen extends React.Component {
  render() {
    return (
      <Restaurant {... this.props} />
    );
  }
}

export default connect(RestaurantScreen);