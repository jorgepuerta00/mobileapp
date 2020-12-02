import React from "react";
import Register from "../container/user/Register";

import { ConnectedComponent as connect } from '../components';

class RegisterScreen extends React.Component {
  render() {
    return (
      <Register {...this.props} />
    );
  }
}

export default connect(RegisterScreen);