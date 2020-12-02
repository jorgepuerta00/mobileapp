import React from "react";
import Login from "../container/user/Login";

import { ConnectedComponent as connect } from '../components';

class LoginScreen extends React.Component {
  render() {
    return (
      <Login {... this.props} />
    );
  }
}

export default connect(LoginScreen);