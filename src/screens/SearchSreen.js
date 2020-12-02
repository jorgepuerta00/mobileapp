import React from "react";
import Search from "../container/products/Search";

import { ConnectedComponent as connect } from '../components';

class SearchSreen extends React.Component {
  render() {
    return (
      <Search {...this.props} />
    );
  }
}

export default connect(SearchSreen);