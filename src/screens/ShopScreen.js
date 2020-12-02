import React from "react";
import Products from "../container/products/Products";

import { ConnectedComponent as connect } from '../components';

class ShopScreen extends React.Component {
  render() {
    return (
      <Products {... this.props} />
    );
  }
}

export default connect(ShopScreen);